
import React, { Component } from 'react';
import { Platform, StyleSheet, View, Text, Alert} from 'react-native';
import params from './src/Params'
import Header from './src/components/Header'
import MineField from './src/components/MineField'
import LevelSelection from './src/screens/LevelSelection'
import { createMinedBoard, 
          cloneBoard, 
          openField, 
          hadExplosion, 
          wonGame, 
          showMines,
          invertFlag,
          flagUsed, } from './src/Function'
import { Level } from 'chalk';


export default class App extends Component {

 constructor(props){
  super(props)
  this.state = this.createState()
 }

  minesAmount = () => {
    const cols = params.getColumnsAmount()
    const rows = params.getRowAmount()
    return Math.ceil(cols * rows * params.difficultLevel)
  }

  createState = () => {
    const cols = params.getColumnsAmount()
    const rows = params.getRowAmount()
    return {
      board: createMinedBoard(rows, cols, this.minesAmount()),
      won: false,
      lost: false,
      showLevelSelection: false,
    }
  }

  onOpenField = (row, column) => {
    const board = cloneBoard(this.state.board)
    openField(board, row, column)
    const lost = hadExplosion(board)
    const won = wonGame(board)

    if(lost){
      showMines(board)
      Alert.alert('Você Perdeu!')
    }

    if(won){
      Alert.alert('Você Ganhou!')
    }

    this.setState({board, lost, won})
  }

  onSelectField = (row, column) => {
    const board = cloneBoard(this.state.board)
    invertFlag(board, row, column)
    const won = wonGame(board)

    if(won) {
      Alert.alert('Você Ganhou!')
    }

    this.setState({board, won})
  }

  onLevelSelected = level => {
    params.difficultLevel = level
    this.setState(this.createState())
  }

  render (){ 
    return (
      <View style={styles.container}>
        <LevelSelection isVisible={this.state.showLevelSelection}
          onLevelSelected={this.onLevelSelected}
          onCancel={() => this.setState({showLevelSelection: false})} />
        <Header flagsLeft={this.minesAmount() - flagUsed(this.state.board)}
          onNewGame={() => this.setState(this.createState())}
          onFlagPress={() => this.setState({showLevelSelection: true})} />
          <View syle={styles.board}>
            <MineField board={this.state.board} 
              onOpenField={this.onOpenField}
              onSelectField={this.onSelectField}/>
          </View>

      </View>
    );
  }
};

const styles = StyleSheet.create({
 container: {
   flex: 1,
   justifyContent: 'flex-end'
 },
 board: {
   alignItems: 'center',
   backgroundColor: '#aaa'
 }
});