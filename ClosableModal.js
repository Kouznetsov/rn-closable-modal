import React, {Component} from "react"
import {
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    Modal,
    Dimensions,
    Platform
} from "react-native"

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
            const {height, width} = Dimensions.get('window');

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
                                    height: dim.y,
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
                                    top: dim.y,
                                    height: dim.height,
                                    width: dim.x
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
                                    top: dim.y,
                                    right: 0,
                                    height: dim.height,
                                    width: dim.x
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
                                top: dim.y + dim.height,
                                height: height - (dim.y + dim.height),
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
                                height: dim.y,
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
                                    top: dim.y,
                                    height: dim.height,
                                    width: dim.x
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
                                    top: dim.y,
                                    right: 0,
                                    height: dim.height,
                                    width: dim.x
                                }}
                            />
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback
                            onPress={() => {
                                this._closeModal()
                            }}>
                            <View style={{
                                position: "absolute",
                                top: dim.y + dim.height,
                                height: height - (dim.y + dim.height),
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
                       visible={this.state.show}>
                    {this._renderCloseArea()}
                    <Dialog renderDialogContent={this.props.children}
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