import 'dart:io';
import 'dart:convert';
import 'dart:core';

var cycleCount =0;
var registerState = 1;
var signalStrengthSum = 0;

var currentLine = '';

main() {
  var config = new File("C://input.txt");
  List<String> lines = config.readAsLinesSync();

  for (var l in lines){

    if(l.startsWith("noop")){
      addCycle();
    }

    if(l.startsWith("addx")){
      var value = l.substring(4);
      addCycle();
      addCycle();
      registerState+=int.parse(value);
    }
    }  
    print(signalStrengthSum);
  }

  void addCycle(){
    //A
    if(cycleCount == 19 || cycleCount%40==19){
    //print("During the cycle :" +cycleCount.toString()  + ", register:"+ registerState.toString());
    signalStrengthSum += ((cycleCount+1)*registerState);
    }

    //B
    if((cycleCount%40==registerState) || (cycleCount%40==registerState-1) || (cycleCount%40==registerState+1)){
      currentLine+='#';
    }
    else if(cycleCount != 0){
      currentLine += '.';
    }

    if(cycleCount != 0 && (cycleCount)%40==39){
    print(currentLine);
    currentLine='';
    }

    cycleCount++;
  }