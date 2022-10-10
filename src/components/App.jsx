import React, { Component } from 'react';
import { SearchBar } from './Searchbar/Searchbar';
import { ImageGalleryList } from './ImageGallery/ImageGallery';
import { requestPhoto } from 'components/service/APIService';
import { Modal } from './Modal/Modal';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import toast, { Toaster } from 'react-hot-toast';
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
    modal: null,
    status: listStatus.idle,
  };

  pushDataToState = async (name, page) => {
    this.setState({ status: listStatus.pending });
    const dateFromApi = await requestPhoto(name, page);
    const totalPage = Math.ceil(dateFromApi.totalHits / 12);
    let filteredData = dateFromApi.hits.map(n => {
      const neededData = {
        id: n.id,
        webformatURL: n.webformatURL,
        largeImageURL: n.largeImageURL,
      };
      return neededData;
    });
    if (filteredData.length === 0) {
      toast.error('No matches for this query.');
      this.setState({ status: listStatus.reject });
    } else {
      this.setState(prevState => ({
        images: [...prevState.images, ...filteredData],
      }));
      this.setState({ status: listStatus.resolved });
    }
    if (this.state.page === totalPage) {
      toast.error('This is last page.');
      this.setState({ status: listStatus.reject });
    }
  };

  componentDidUpdate(_, prevState) {
    const prevName = prevState.name;
    const nextName = this.state.name;
    const prevPage = prevState.page;
    const nextPage = this.state.page;
    if (prevName !== nextName) {
      this.setState({ images: [], page: 1 });
      this.pushDataToState(nextName, 1);
    }
    if (prevPage !== nextPage && prevPage < nextPage) {
      this.pushDataToState(nextName, nextPage);
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
    this.setState({ modal: null });
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
        {modal && <Modal currentImg={modal} closeModal={this.closeModal} />}
        {status === listStatus.pending && <Loader />}
        <Toaster position="top-right" reverseOrder={true} />
      </div>
    );
  }
}
