import React from 'react';
// import { connect } from 'react-redux';
import RootRouter from 'layout/router/RootRouter';

class App extends React.PureComponent {

    render() {
        return (
            <div >
                <RootRouter />
            </div>
        );
    }
}

export default (App);
