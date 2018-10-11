// @flow
// NODE MODULES
import * as React from "react";

type Props = {};

type State = {

};

// COMPONENT
export default class CountryDetail extends React.Component<Props, State> {
  constructor() {
    super();

    this.state = {
      nameFromUrlParams: "",
      data: {}
    };
  }

  // LIFECYCLE FUNCTIONS 

  componentDidMount(): void {
    this.setState({
      nameFromUrlParams: new URL(window.location.href).hash.split('name=')[1]
    }, () => {
      this._getCountryDataFromStore();
    })
  }

  componentWillUnmount(): void {
  }

  shouldComponentUpdate(nextProps: Props, nextState: State): boolean {
    return true;
  };

  _getCountryDataFromStore = () => {
    let { nameFromUrlParams } = this.state;

    let _country = this.props.country.value
      .filter( country => country.name === nameFromUrlParams)[0]

    if( !_country ) {
      this._navigateBack();

    } else {
      this.setState({ data: _country });
    }
  }

  _navigateBack = () => {
    this.props.history.goBack();
  }

  render(): React.Element<"div"> {

    // // VARIABLES

    // const { deleteStatus } = this.props;

    // const { data } = this.state;

    // // DYNAMIC STYLES 

    // let _deleteStyle = {
    //   display: deleteStatus.complete && !deleteStatus.pending ? 'none' : ''
    // }

    // // FINAL RENDERED JSX

    // let _nav: React.Element<'div'>
    //   = <div>
    //       <button 
    //         onClick={() => this._navigateBack()}>
    //         <h4>Back</h4>
    //       </button>
    //       <button 
    //         style={_deleteStyle}
    //         onClick={() => this._deleteThisCake()}>
    //         Delete this cake
    //       </button>
    //     </div>

    // let _cakeDetails: React.Element<'div'>
    //   = !deleteStatus.pending && !deleteStatus.complete
    //     ? <div className={`CakeDetail__cake`}>
    //         <h1>{ data.name }</h1>
    //         <p>{ data.comment }</p>
    //       </div> : null;

    // let _deletingMessage: React.Element<'div'>
    //   = deleteStatus.pending && !deleteStatus.complete
    //     ? <div>
    //       <p>Deleting the {data.name} cake....</p>
    //     </div> : null;

    // let _deletedMessage: React.Element<'div'>
    //   = deleteStatus.complete && !deleteStatus.pending
    //     ? <div>
    //       <p>{data.name} cake deleted! </p>
    //     </div> : null;

    // let _deleteError: React.Element<'div'>
    //   = deleteStatus.error
    //     ? <div>
    //         <p>Oops something went wrong while deleting the {data.name} cake :(</p>
    //       </div> : null;
        
    // let _allContent: React.Element<'div'>
    //   = <div>
    //     {_cakeDetails}
    //     {_deletingMessage}
    //     {_deletedMessage}
    //     {_deleteError}
    //   </div>

    return (
      <div className={`CountryDetail`}>

      </div>
    );
  }
}