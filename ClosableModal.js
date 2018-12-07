import React, {Component} from "react"
import {
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    Modal,
    Dimensions,
    Platform
} from "react-native"
import {getBottomSpace, getStatusBarHeight} from "react-native-iphone-x-helper"

class Dialog extends Component {

    _onLayoutReady = (event) => {
        this.props.layoutCallback(event)
    };

    render() {
        return (
            <View style={{flex: 1, justifyContent: "center", zIndex: 110, backgroundColor: this.props.overlayColor}}>
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

    _renderCloseArea = () => {

        if (this.state.dialogDimensions !== null) {
            const dim = this.state.dialogDimensions;
            //const {height, width} = Dimensions.get('window');
            const height = this.props.isLandscape ?
                Math.min(Dimensions.get("window").height, Dimensions.get("window").width) :
                Math.max(Dimensions.get("window").height, Dimensions.get("window").width);
            const width = this.props.isLandscape ?
                Math.max(Dimensions.get("window").height, Dimensions.get("window").width) :
                Math.min(Dimensions.get("window").height, Dimensions.get("window").width);
            let x = Math.abs(this.props.isLandscape ? dim.y : dim.x);
            let y = Math.abs(this.props.isLandscape ? dim.x: dim.y);
            x -= this.props.isLandscape ? getStatusBarHeight() : 0;


            if (Platform.OS === "android")
                return (
                    <View>
                        <TouchableWithoutFeedback
                            onPress={() => {
                                this._closeModal()
                            }}>
                            <View
                                style={{
                                    zIndex: 200,
                                    position: "absolute",
                                    height: y,
                                    width: width
                                }}
                            />
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback
                            onPress={() => {
                                this._closeModal()
                            }}>
                            <View
                                style={{
                                    zIndex: 200,
                                    position: "absolute",
                                    top: y,
                                    height: dim.height,
                                    width: x
                                }}
                            />
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback
                            onPress={() => {
                                this._closeModal()
                            }}>
                            <View
                                style={{
                                    zIndex: 200,
                                    position: "absolute",
                                    top: y,
                                    right: 0,
                                    height: dim.height,
                                    width: x
                                }}
                            />
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback
                            onPress={() => {
                                this._closeModal()
                            }}>
                            <View style={{
                                zIndex: 200,

                                position: "absolute",
                                top: y + dim.height,
                                height: height - (y + dim.height),
                                width: width
                            }}/>
                        </TouchableWithoutFeedback>
                    </View>
                );
            else
                return (
                    <View style={{zIndex: 100000}}>
                        <TouchableWithoutFeedback onPress={() => {
                            this._closeModal()
                        }}>
                            <View style={{
                                position: "absolute",
                                backgroundColor: "orange",
                                opacity: 0.3,
                                height: y,
                                width: width
                            }}/>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback
                            onPress={() => {
                                this._closeModal()
                            }}>
                            <View
                                style={{
                                    position: "absolute",
                                    top: y,
                                    opacity: 0.3,
                                    height: dim.height,
                                    backgroundColor: "red",
                                    width: x
                                }}
                            />
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback
                            onPress={() => {
                                this._closeModal()
                            }}>
                            <View
                                style={{
                                    position: "absolute",
                                    top: y,
                                    right: 0,
                                    opacity: 0.3,
                                    backgroundColor: "green",
                                    height: dim.height,
                                    width: x
                                }}
                            />
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback
                            onPress={() => {
                                this._closeModal()
                            }}>
                            <View style={{
                                position: "absolute",
                                backgroundColor: "yellow",
                                opacity: 0.3,
                                top: y + dim.height,
                                height: height - (y + dim.height),
                                width: width
                            }}/>
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
                    {this._renderCloseArea()}
                    <Dialog renderDialogContent={() => this.props.children}
                            popupStyles={this.props.popupStyles}
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