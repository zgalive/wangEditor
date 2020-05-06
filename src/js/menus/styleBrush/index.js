import $ from '../../util/dom-core.js'

function StyleBrush(editor){
    this.editor = editor
    this.$elem = $(
        `<div class="w-e-menu">
            <i class="w-e-icon-style-brush"></i>
        </div>`
    )

    this.type = 'click'

    // 当前是否 active 状态
    this._active = false
}

StyleBrush.prototype = {
    constructor: StyleBrush,
    onClick: function(e){
        const editor = this.editor
        const isSeleEmpty = editor.selection.isSelectionEmpty()
        if (isSeleEmpty) {
            return
        }

        if (this._active) {
            this._active = false
            editor._brush=false
            this.$elem.removeClass('w-e-active')
            editor.$textContainerElem.removeClass('brush')
            return
        }

        this._active = true
        editor._brush=true

        this.$elem.addClass('w-e-active')
        editor.$textContainerElem.addClass('brush')

        let containerEle = editor.selection.getSelectionContainerElem()
        let style = containerEle.css()

        while (!containerEle.equal(editor.$textElem[0])) {
            containerEle=containerEle.parent()
            if (containerEle.parent().equal(editor.$textElem[0])&&!containerEle.equal(editor.$textElem[0])) {
                style=Object.assign({},style,{wrap:containerEle.css()})
            }
            if(!containerEle.parent().equal(editor.$textElem[0])&&!containerEle.equal(editor.$textElem[0])){
                style=Object.assign({},style,containerEle.css())
            }
        }

        editor._style=style
    }
}
export default StyleBrush