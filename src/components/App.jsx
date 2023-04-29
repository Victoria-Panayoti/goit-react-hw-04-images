import { fetchGallery } from 'Api';
import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';

export class App extends Component {
  state = {
    gallery: [],
    isLoading: false,
  };

  // async componentDidMount() {
  //   try {
  //     const fetchGallery = await fetchGallery();
  //     this.setState({ gallery: fetchGallery });
  //   } catch(error){}
  //  }
  fetchGallery = async values => {
    try{this.setState({ isLoading: true });
    const gallery = await fetchGallery(values);
    this.setState({ gallery: [fetchGallery], isLoading: false });
    console.log(gallery);}catch(error){console.log(error);;}
    
  };
  render() {
    const { isLoading } = this.state;
    return (
      <div>
        {isLoading && <div>Loading</div>}
        <Searchbar onSubmit={this.fetchGallery} isSubmitting={isLoading} />
      </div>
    );
  }
}
