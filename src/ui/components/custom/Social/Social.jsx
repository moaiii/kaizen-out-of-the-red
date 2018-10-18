// @flow
// NODE MODULES
import * as React from "react";

// COMPONENTS
// ........

// ASSETS
// ........

// UTILITIES
// ........

// TYPES
type Props = {};

type State = {
  animateClass: string
};

// COMPONENT
export default class Social extends React.Component<Props, State> {
  constructor() {
    super();

    this.state = {
      animateClass: ""
    };
  }

  // CLASS FUNCTIONS
  componentDidMount(): void {
    setTimeout(() => {
      this.setState({
        animateClass: "--animate"
      })
    }, 50);
  }

  shouldComponentUpdate(nextProps: Props, nextState: State): boolean {
    return true;
  };

  componentDidUpdate(prevProps: Props, prevState: State): void {}

  render(): React.Element<"div"> {
    // DEBUG
    if( process.env.REACT_APP_RENDER_DEBUG === "true" ) {
      console.log("rendering", this) };

    // VARIABLES
    //const {} = this.props;
    const { animateClass } = this.state;

    // DYNAMIC STYLES AND CLASSES
    // ...

    // PRIVATE COMPONENTS
    // ...

    // FINAL RENDERED JSX
    return (
      <div className={`Social ${ animateClass }`}>
        <p>custom > Social</p>
      </div>
    );
  }
}

// LISTEN TO REDUX
// const storeToProps = ( store: Object ): Object => {
//   return {}
// }

// export default connect( storeToProps )( Social );
