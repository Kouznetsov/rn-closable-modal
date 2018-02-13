This package is a closable modal for react native.

## Installation ##

`npm install rn-closable-modal`

## Then what ? ##

```
import ClosableModal from "rn-closable-modal"

<ClosableModal show={this.state.showModal}
               onClose={this._onModalClosed}
               overlayColor={"rgba(0,0,0,0.5)"}
               renderModalContent={this.myRenderModalMethod}/>
```

## What are these props ? ##


| name | type  | required  | description  |
|---|---|---|--:|
| show   | boolean  | yes  | true -> shown. false -> hidden. |
| onClose  | function  | no  | callback called on closing the modal (e.g. to set your state) |
| onLayoutCallback | function(event)  | no  | callback called when the layout is ready (might be useful if you wanna know the size of some things before rendering them) |
| overlayColor | string | no | color of the overlay hiding the screen (`rgba(0,0,0,0.5)` by default) |
| renderModalContent  | function  | yes  | function returning the content that will be displayed inside the modal  |

This piece of code was coded by a shoeless foot and incredibly ugly. Putting this in production is discouraged.

## Example ##

An example of implementation is available [in this repository](https://github.com/Kouznetsov/rn-closable-modal-example/tree/master)