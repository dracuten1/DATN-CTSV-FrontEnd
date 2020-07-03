import React from 'react';
// import { connect } from 'react-redux';
import RootRouter from 'layout/router/RootRouter';
import { LinearProgress } from '@material-ui/core';
import { connect } from 'react-redux';

class App extends React.PureComponent {


    render() {
        const { hiddenProgressStatus } = this.props;
        return (
            <div >
                <div style={{ height: 10, position: 'sticky', zIndex: '999999', top: 0, width: '100vw' }}>
                    <LinearProgress color="primary" hidden={hiddenProgressStatus} />
                </div>
                <RootRouter />
            </div>
        );
    }
}

const mapStateToProps = state => {
    console.log("PROGRESS TEST: ", state.ProgressState.hiddenStatus);
    return {
        hiddenProgressStatus: state.ProgressState.hiddenStatus,
    }
}
export default connect(mapStateToProps)(App);
