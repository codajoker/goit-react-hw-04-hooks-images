import React, { Component, useEffect, useState } from 'react';
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
  const [error, setError] = useState(null);
  const [largeImage, setLargeImage] = useState(null);

  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

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
    responceFunction().then(({ data }) => {
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
    });

    // setLoading(false);
    responceFunction().then(({ data }) => {
      setArrayImage(data.hits);
      setLoading(false);
    });
  }, [imageName]);
  useEffect(() => {
    if (page === 1) {
      return;
    }
    responceFunction().then(({ data }) =>
      setArrayImage([...arrayImage, ...data.hits])
    );
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

// class oApp extends Component {
//   state = {
//     imageName: '',
//     arrayImage: [],
//     error: null,
//     loading: false,
//     page: 1,
//     showModal: false,
//     largeImage: null,
//   };
//   toogleModal = () => {
//     this.setState(state => ({
//       showModal: !state.showModal,
//     }));
//   };
//   handleLoadMore = e => {
//     e.preventDefault();
//     this.setState(prevState => ({ page: prevState.page + 1 }));
//   };
//   handleSearcFormSubmit = imageName => {
//     this.setState({ imageName });
//   };
//   handleImageClick = largeImage => {
//     this.setState({ largeImage });
//   };
//   async componentDidUpdate(prevProps, prevState) {
//     try {
//       if (prevState.imageName !== this.state.imageName) {
//         this.setState({ arrayImage: [] });
//         this.setState({ loading: true });
//         const responce = await axios.get(
//           `/?q=${this.state.imageName}&page=${this.state.page}&key=24245591-38d8af0f79f16661bb7c2f839&image_type=photo&orientation=horizontal&per_page=12`
//         );
//         this.setState({ loading: false });
//         if (responce.data.hits.length === 0) {
//           toast.info('🦄 Такого изображения у нас нет', {
//             position: 'top-left',
//             autoClose: 5000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             progress: undefined,
//           });
//           return;
//         }
//         this.setState({
//           arrayImage: responce.data.hits,
//         });
//       }
//       if (prevState.page !== this.state.page) {
//         const responce = await axios.get(
//           `/?q=${this.state.imageName}&page=${this.state.page}&key=24245591-38d8af0f79f16661bb7c2f839&image_type=photo&orientation=horizontal&per_page=12`
//         );
//         this.setState({
//           arrayImage: [...this.state.arrayImage, ...responce.data.hits],
//         });
//       }
//     } catch (errorr) {
//       this.setState({ error: errorr });
//     }
//   }
//   render() {
//     return (
//       <>
//         <Searchbar onSubmit={this.handleSearcFormSubmit}></Searchbar>
//         <ToastContainer
//           position="top-left"
//           autoClose={5000}
//           hideProgressBar={false}
//           newestOnTop={false}
//           closeOnClick
//           rtl={false}
//           pauseOnFocusLoss
//           draggable
//           pauseOnHover
//         />
//         <ImageGallery
//           toogleModal={this.toogleModal}
//           onClick={this.handleImageClick}
//           arrayImage={this.state.arrayImage}
//         ></ImageGallery>
//         {this.state.loading && <Loader></Loader>}
//         {this.state.error && alert('Что-то пошло не так перезайдите позже')}

//         {this.state.showModal && (
//           <Modal
//             toogleModal={this.toogleModal}
//             largeImage={this.state.largeImage}
//           >
//             <img src={this.state.largeImage} alt="" />
//           </Modal>
//         )}
//         {this.state.arrayImage.length !== 0 && (
//           <Button onClick={this.handleLoadMore}></Button>
//         )}
//       </>
//     );
//   }
// }
// export default oApp;
