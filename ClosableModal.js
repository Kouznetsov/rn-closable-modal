import React, {Component} from "react"
import {
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    Modal,
    Dimensions,
    Platform
} from "react-native"

const Orientations = {
    VERTICAL: "vertical",
    HORIZONTAL: "horizontal"
};

class Dialog extends Component {

    _onLayoutReady = (event) => {
        this.props.layoutCallback(event)
    };

    render() {
        return (
            <View style={{flex: 1, justifyContent: "center", zIndex: 1, backgroundColor: this.props.overlayColor}}>
                {this.props.closeArea}
                <View style={[styles.dialog, this.props.popupStyles]} onLayout={(event) => this._onLayoutReady(event)}>
                    {this.props.renderDialogContent()}
                </View>
            </View>
        );
    }
}

export default class ClosableModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: this.props.show,
            dialogDimensions: null,
            isClosable: this.props.isClosable === undefined ? true : this.props.isClosable
        };
    }

    _closeModal = () => {
        if (this.state.isClosable) {
            if (this.props.onClose !== undefined)
                this.props.onClose();
            this.setState({show: false})
        }
    };

    componentWillReceiveProps(nextProps) {
        this.setState({show: nextProps.show});
    }

    _onLayoutDialog = (event) => {
        this.setState({dialogDimensions: event.nativeEvent.layout});
        if (this.props.onLayoutCallback !== undefined)
            this.props.onLayoutCallback(event);
    };

    getDimensions = () => {
        if (this.props.orientation === Orientations.VERTICAL || this.props.vertical) {
            return {
                x: this.state.dialogDimensions.x,
                y: this.state.dialogDimensions.y,
                height: Math.max(this.state.dialogDimensions.width, this.state.dialogDimensions.height),
                width: Math.min(this.state.dialogDimensions.width, this.state.dialogDimensions.height),
                screenWidth: Math.min(Dimensions.get('window').height, Dimensions.get('window').width),
                screenHeight: Math.max(Dimensions.get('window').height, Dimensions.get('window').width)
            };
        }
        else if (this.props.orientation === Orientations.HORIZONTAL || this.props.horizontal) {
            return {
                x: this.state.dialogDimensions.x,
                y: this.state.dialogDimensions.y,
                height: Math.max(this.state.dialogDimensions.width, this.state.dialogDimensions.height),
                width: Math.min(this.state.dialogDimensions.width, this.state.dialogDimensions.height),
                screenWidth: Math.max(Dimensions.get('window').height, Dimensions.get('window').width),
                screenHeight: Math.min(Dimensions.get('window').height, Dimensions.get('window').width)
            };
        } else {
            return {
                x: this.state.dialogDimensions.x,
                y: this.state.dialogDimensions.y,
                height: Math.max(this.state.dialogDimensions.width, this.state.dialogDimensions.height),
                width: Math.min(this.state.dialogDimensions.width, this.state.dialogDimensions.height),
                screenWidth: Math.min(Dimensions.get('window').height, Dimensions.get('window').width),
                screenHeight: Math.max(Dimensions.get('window').height, Dimensions.get('window').width)
            };
        }
    };

    _renderCloseArea = () => {
        if (this.state.dialogDimensions !== null) {
            const dim = this.getDimensions();
            const commonStyle = {position: "absolute", zIndex: 200};

            return (
                <View>
                    <TouchableWithoutFeedback onPress={this._closeModal}>
                        <View style={[commonStyle, {
                            marginTop: -dim.screenHeight / 2,
                            height: dim.y,
                            width: dim.screenWidth
                        }]}/>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={this._closeModal}>
                        <View style={[commonStyle, {
                            top: dim.y - dim.screenHeight / 2,
                            height: dim.height,
                            width: dim.x,
                        }]}/>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={this._closeModal}>
                        <View style={[commonStyle, {
                            marginTop: dim.y - dim.screenHeight / 2,
                            right: 0,
                            height: dim.height,
                            width: dim.x,
                        }]}/>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={this._closeModal}>
                        <View style={[commonStyle, {
                            marginTop: dim.y + dim.height - dim.screenHeight / 2,
                            height: dim.screenHeight - (dim.y + dim.height),
                            width: dim.screenWidth
                        }]}/>
                    </TouchableWithoutFeedback>
                </View>
            );
        } else
            return <View/>;

    };

    render() {
        return (
            <View style={styles.globalContainer}>
                <Modal animationType={'fade'}
                       onRequestClose={() => this._closeModal()}
                       transparent={true}
                       supportedOrientations={['portrait', 'landscape']}
                       visible={this.state.show}>
                    <Dialog renderDialogContent={() => this.props.children}
                            popupStyles={this.props.popupStyles}
                            closeArea={this._renderCloseArea()}
                            overlayColor={this.props.overlayColor === undefined ? "rgba(0,0,0,0.5)" : this.props.overlayColor}
                            pack={this.props.pack}
                            layoutCallback={(event) => {
                                if (this.state.dialogDimensions === null)
                                    this._onLayoutDialog(event)
                            }}/>
                </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    globalContainer: {
        justifyContent: 'center',
    },
    dialog: {
        flex: 1,
        position: 'absolute',
        alignSelf: 'center',
        zIndex: 100
    },
});
