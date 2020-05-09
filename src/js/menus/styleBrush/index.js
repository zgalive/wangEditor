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

        //如果是激活状态，点击则取消
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
        editor.$textContainerElem.addClass('brush')//todo add cursor type

        let containerEle = null
        //如果选择了多行作为参照样式，默认使用第一行选区的样式
        if(editor.selection._currentRange.startContainer != editor.selection._currentRange.endContainer){
            containerEle = $(editor.selection._currentRange.startContainer)
        }else{
            containerEle = editor.selection.getSelectionContainerElem()
        }
        let style = containerEle.css()

        // while (!containerEle.equal(editor.$textElem[0])) {
        //     containerEle=containerEle.parent()
        //     if (containerEle.parent().equal(editor.$textElem[0])&&!containerEle.equal(editor.$textElem[0])) {
        //         style=Object.assign({},style,{wrap:containerEle.css()})
        //     }
        //     if(!containerEle.parent().equal(editor.$textElem[0])&&!containerEle.equal(editor.$textElem[0])){
        //         style=Object.assign({},style,containerEle.css())
        //     }
        // }

        editor._style=style
    }
}
export default StyleBrush