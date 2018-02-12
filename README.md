This package is a closable modal for react native.

## Installation ##

`npm install rn-closable-modal`

## Then what ? ##

```
 <CloseableModal  show={this.state.modalShown}
                  onClose={this._onClose}
                  onLayoutCallback={(event) => this._onLayoutReady(event)}
                  overlayColor={/* Overlay (background) color */}
                  popupStyles={styles.dialog}
                  renderDialogContent={this._renderContent} />
```

## What are these props ? ##


| name | type  | required  | description  |
|---|---|---|--:|
| show   | boolean  | yes  | true -> shown. false -> hidden. |
| onClose  | function  | yes  | callback called on closing the modal (set your state here or something) |
| onLayoutCallback | function(event)  | no  | callback called when the layout is ready (might be useful if you wanna know the size of some things before rendering them) |
| overlayColor | string | yes | color of the overlay hiding the screen |
| popupStyles  | object  | yes  | styles of your inner popup (This code is dirty, be warned)  |
| renderDialogContent  | function  | yes  | function returning the content that will be displayed inside the modal  |

This piece of code was coded by a shoeless foot and incredibly ugly. Putting this in production is discouraged.
