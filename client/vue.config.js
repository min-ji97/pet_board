module.exports = {
    css : {
        loaderOptions: {
            sass : {
                data: `
                    @import "@/styles/tiptap/variables.scss"
                    @import "@/styles/tiptap/editor.scss"
                    @import "@/styles/tiptap/main.scss"
                    @import "@/styles/tiptap/menubar.scss"
                    @import "@/styles/tiptap/menububble.scss"
                    
                    
                `
                // sass-loader 버전 8 : data가 아닌 prependData
                // 8버전 이상은 additionalData import './styles/tiptap/main.scss';
            }
        }

    }
}