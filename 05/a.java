import java.io.BufferedReader;
import java.io.Console;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

class Init {
  public static void main(String[] args) {
    List<List<Character>> cargoStacks = new ArrayList<>();
    cargoStacks.add(new ArrayList(Arrays.asList(new Character[] { 'F', 'D', 'B', 'Z', 'T', 'J', 'R', 'N' })));
    cargoStacks.add(new ArrayList(Arrays.asList(new Character[] { 'R', 'S', 'N', 'J', 'H' })));
    cargoStacks.add(new ArrayList(Arrays.asList(new Character[] { 'C', 'R', 'N', 'J', 'G', 'Z', 'F', 'Q' })));
    cargoStacks.add(new ArrayList(Arrays.asList(new Character[] { 'F', 'V', 'N', 'G', 'R', 'T', 'Q' })));
    cargoStacks.add(new ArrayList(Arrays.asList(new Character[] { 'L', 'T', 'Q', 'F' })));
    cargoStacks.add(new ArrayList(Arrays.asList(new Character[] { 'Q', 'C', 'W', 'Z', 'B', 'R', 'G', 'N' })));
    cargoStacks.add(new ArrayList(Arrays.asList(new Character[] { 'F', 'C', 'L', 'S', 'N', 'H', 'M' })));
    cargoStacks.add(new ArrayList(Arrays.asList(new Character[] { 'D', 'N', 'Q', 'M', 'T', 'J' })));
    cargoStacks.add(new ArrayList(Arrays.asList(new Character[] { 'P', 'G', 'S' })));

    // System.out.print(cargoStacks);

    List<String> result = new ArrayList<String>();
    try (Stream<String> lines = Files.lines(Paths.get("C:\\input.txt"))) {
      result = lines.collect(Collectors.toList());
    } catch (Exception e) {
      //
    }

    for (String currentLine : result) {
      // moveCargoA(currentLine, cargoStacks);
      moveCargoB(currentLine, cargoStacks);
    }

    System.out.print("ReOrdered:");
    System.out.print(cargoStacks);

  }

  public static void moveCargoA(String moveCommand, List<List<Character>> cargoStacks) {
    List<Integer> spaceIndexes = new ArrayList<Integer>();
    int index = moveCommand.indexOf(' ');
    while (index >= 0) {
      spaceIndexes.add(index);
      index = moveCommand.indexOf(' ', index + 1);
    }

    int count = Integer.parseInt(moveCommand.substring(spaceIndexes.get(0) + 1, spaceIndexes.get(1)));
    int from = Integer.parseInt(moveCommand.substring(spaceIndexes.get(2) + 1, spaceIndexes.get(3)));
    int to = Integer.parseInt(moveCommand.substring(spaceIndexes.get(4) + 1));

    for (int i = 0; i < count; i++) {
      Character charToMove = (cargoStacks.get(from - 1)).get(cargoStacks.get(from - 1).size() - 1);
      List<Character> destination = cargoStacks.get(to - 1);
      destination.add(charToMove);

      var indexToDelete = cargoStacks.get(from - 1).size() - 1;
      var source = cargoStacks.get(from - 1);

      source.remove(indexToDelete);
    }
  }

  public static void moveCargoB(String moveCommand, List<List<Character>> cargoStacks) {
    List<Integer> spaceIndexes = new ArrayList<Integer>();
    int index = moveCommand.indexOf(' ');
    while (index >= 0) {
      spaceIndexes.add(index);
      index = moveCommand.indexOf(' ', index + 1);
    }

    int count = Integer.parseInt(moveCommand.substring(spaceIndexes.get(0) + 1, spaceIndexes.get(1)));
    int from = Integer.parseInt(moveCommand.substring(spaceIndexes.get(2) + 1, spaceIndexes.get(3)));
    int to = Integer.parseInt(moveCommand.substring(spaceIndexes.get(4) + 1));

    for (int i = 0; i < count; i++) {
      Character charToMove = (cargoStacks.get(from - 1)).get(cargoStacks.get(from - 1).size() - 1);
      List<Character> destination = cargoStacks.get(to - 1);
      destination.add(destination.size() - i, charToMove);

      var indexToDelete = cargoStacks.get(from - 1).size() - 1;
      var source = cargoStacks.get(from - 1);

      source.remove(indexToDelete);
    }
  }
}