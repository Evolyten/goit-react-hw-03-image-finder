import React, { Component } from 'react';
import { SearchBar } from './Searchbar/Searchbar';
import { ImageGalleryList } from './ImageGallery/ImageGallery';
import { requestPhoto } from 'components/service/APIService';
import { Modal } from './Modal/Modal';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
const listStatus = {
  idle: 'IDLE',
  pending: 'PENDING',
  resolved: 'RESOLVED',
  reject: 'REJECT',
};

export class App extends Component {
  state = {
    name: '',
    images: [],
    page: 1,
    modal: false,
    status: listStatus.idle,
  };

  pushDataToState = async (name, page) => {
    this.setState({ status: listStatus.pending });
    const data = await requestPhoto(name, page);
    if (data.length === 0) {
      alert('No matches for this query');
      this.setState({ status: listStatus.reject });
    } else {
      this.setState(prevState => ({
        images: [...prevState.images, ...data],
      }));
      this.setState({ status: listStatus.resolved });
    }
  };

  componentDidUpdate(_, prevState) {
    const prevName = prevState.name;
    const nextName = this.state.name;
    const prevPage = prevState.page;
    const nextPage = this.state.page;
    const nextModal = this.state.modal;
    if (prevName !== nextName) {
      this.setState({ images: [], page: 1 });
      this.pushDataToState(nextName, 1);
    }
    if (prevPage !== nextPage && prevPage < nextPage) {
      this.pushDataToState(nextName, nextPage);
    }
    if (nextModal) {
      window.addEventListener('keydown', this.addKeyListener);
    }
    if (!nextModal) {
      window.removeEventListener('keydown', this.addKeyListener);
    }
  }

  userName = value => {
    this.setState({ name: value });
  };
  takeMorePage = async () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };
  userClick = id => {
    const pickedImg = this.state.images.find(img => img.id === id);
    this.setState({ modal: pickedImg });
  };
  closeModal = () => {
    this.setState({ modal: false });
  };
  addKeyListener = e => {
    if (e.code === 'Escape') {
      this.closeModal();
    }
  };

  render() {
    const { status, modal, images } = this.state;
    return (
      <div>
        <SearchBar submitForm={this.userName} />
        {images.length > 0 ? (
          <ImageGalleryList
            userImages={images}
            userClickModal={this.userClick}
          />
        ) : (
          <></>
        )}
        {status === listStatus.resolved && (
          <Button incrementPage={this.takeMorePage} />
        )}
        {modal && (
          <Modal
            currentImg={modal}
            closeModal={this.closeModal}
            keyListener={this.addKeyListener}
          />
        )}
        {status === listStatus.pending && <Loader />}
      </div>
    );
  }
}
