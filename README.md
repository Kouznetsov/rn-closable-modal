This package is a closable modal for react native. This package allows to close the modal by:
* Tapping outside of it
* Hitting the back button on android devices

## Preview ##

| Android | iOS |
|---|---|
|  <img src="https://i.imgur.com/ugkFJnr.gif" alt="android example" width="422" height="702"> | <img src="https://i.imgur.com/TEwySkz.gif" alt="ios example" width="362" height="702"> |


## Installation ##

`npm install rn-closable-modal`

## Then what ? ##

```
import ClosableModal from "rn-closable-modal"

<ClosableModal show={this.state.showModal}
               onClose={this._onModalClosed}
               orientation={"horizontal"|"vertical"}
               overlayColor={"rgba(0,0,0,0.5)"}>
    <YourModalContentComponent />
</ClosableModal>               
```

## What are these props ? ##

| name | type  | required  | description  |
|---|---|---|---|
| show   | boolean  | yes  | true -> shown. false -> hidden. |
| onClose  | function  | no  | callback called on closing the modal (e.g. to set your state) |
| onLayoutCallback | function(event)  | no  | callback called when the layout is ready (might be useful if you wanna know the size of some things before rendering them) |
| overlayColor | string | no | color of the overlay hiding the screen (`rgba(0,0,0,0.5)` by default) |
| isClosable | boolean | no | defines if the modal is closable or not by clicking outside or on back on android (default: true) |
| orientation | boolean | no | Defines which orientation the modal is in. Defaults to vertical.
## Example ##

An example of implementation is available [in this repository](https://github.com/Kouznetsov/rn-closable-modal-example/tree/master)
