import { Dimensions } from 'react-native'

const params = {
    blockSize: 30,
    borderSize: 5,
    fontSize: 15,
    headerRatio: 0.15,
    difficultLevel: 0.1,
    getColumnsAmount(){
        const width = Dimensions.get('window').width
        return Math.floor(width / this.blockSize)
    },
    getRowAmount(){
        const totalHeight = Dimensions.get('window').height
        const boardHeigh = totalHeight * (1 - this.headerRatio)
        return Math.floor(boardHeigh / this.blockSize)
    }
}

export default params