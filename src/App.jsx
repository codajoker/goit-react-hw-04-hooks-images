import React, { useEffect, useState } from 'react';
import Searchbar from './components/Searchbar';
import { ImageGallery } from './components/ImageGallery';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import { Loader } from './components/Loader';
import { Modal } from './components/Modal';
import { Button } from './components/Button';
axios.defaults.baseURL = 'https://pixabay.com/api';
function App() {
  const [imageName, setImageName] = useState('');
  const [arrayImage, setArrayImage] = useState([]);
  const [largeImage, setLargeImage] = useState(null);

  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);

  const [page, setPage] = useState(1);
  const toogleModal = () => {
    setShowModal(state => {
      return !state;
    });
  };
  const handleLoadMore = e => {
    e.preventDefault();
    setPage(prevState => {
      return prevState + 1;
    });
  };
  const handleSearcFormSubmit = imageName => {
    setImageName(imageName);
  };
  const handleImageClick = largeImage => {
    setLargeImage(largeImage);
  };
  const responceFunction = async () => {
    return await axios.get(
      `/?q=${imageName}&page=${page}&key=24245591-38d8af0f79f16661bb7c2f839&image_type=photo&orientation=horizontal&per_page=12`
    );
  };
  useEffect(() => {
    if (imageName === '') {
      return;
    }
    setArrayImage([]);
    setLoading(true);
    responceFunction()
      .then(({ data }) => {
        if (data.hits.length === 0) {
          toast.info('🦄 Такого изображения у нас нет', {
            position: 'top-left',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setLoading(false);

          return;
        }
      })
      .catch(error => setError(error));

    responceFunction()
      .then(({ data }) => {
        setArrayImage(data.hits);
        setLoading(false);
      })
      .catch(error => setError(error));
  }, [imageName]);
  useEffect(() => {
    if (page === 1) {
      return;
    }
    responceFunction()
      .then(({ data }) => setArrayImage([...arrayImage, ...data.hits]))
      .catch(error => setError(error));
  }, [page]);
  return (
    <>
      <Searchbar onSubmit={handleSearcFormSubmit}></Searchbar>
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <ImageGallery
        toogleModal={toogleModal}
        onClick={handleImageClick}
        arrayImage={arrayImage}
      ></ImageGallery>
      {loading && <Loader></Loader>}
      {error && alert('Что-то пошло не так перезайдите позже')}

      {showModal && (
        <Modal toogleModal={toogleModal} largeImage={largeImage}>
          <img src={largeImage} alt="" />
        </Modal>
      )}
      {arrayImage.length !== 0 && <Button onClick={handleLoadMore}></Button>}
    </>
  );
}

export default App;
