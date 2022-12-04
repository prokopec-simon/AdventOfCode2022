#include <iostream>
#include <fstream>
#include <string>
#include <sstream>
#include <vector>

using namespace std;

int main()
{
  ifstream f("C:\\input.txt");
  string str;
  if (f) {
    ostringstream ss;
    ss << f.rdbuf();
    str = ss.str();
  }

  vector<string> separatedLines;
  stringstream  data(str);

  string line;
  while (getline(data, line, '\n'))
  {
    separatedLines.push_back(line);
  }

  int totalMatchingPairsFirstTask = 0;
  int totalMatchingPairsSecondTask = 0;


  for (string currentLine : separatedLines) {
    size_t commaPosition = currentLine.find(',');
    size_t newlinePosition = currentLine.find('\n');

    string firstRange = currentLine.substr(0, commaPosition);
    string secondRange = currentLine.substr(commaPosition + 1);

    size_t firstRangeDashPosition = firstRange.find('-');
    int firstRangeStart = stoi(firstRange.substr(0, firstRangeDashPosition));
    int firstRangeEnd = stoi(firstRange.substr(firstRangeDashPosition + 1));

    size_t secondRangeDashPosition = secondRange.find('-');
    int secondRangeStart = stoi(secondRange.substr(0, secondRangeDashPosition));
    int secondRangeEnd = stoi(secondRange.substr(secondRangeDashPosition + 1));

    bool isFittingFirstTask = false;
    bool isFittingSecondTask = false;

    //first task
    if (firstRangeStart >= secondRangeStart && firstRangeEnd <= secondRangeEnd) {
      isFittingFirstTask = true;
    }

    if (secondRangeStart >= firstRangeStart && secondRangeEnd <= firstRangeEnd) {
      isFittingFirstTask = true;
    }

    //second task
    if (firstRangeEnd >= secondRangeStart && firstRangeStart <= secondRangeEnd) {
      isFittingSecondTask = true;
    }

    if (isFittingFirstTask == true) {
      totalMatchingPairsFirstTask++;
    }

    if (isFittingSecondTask == true) {
      totalMatchingPairsSecondTask++;
    }
  //cout << firstRange << "," << secondRange << ": fitting=" << isFittingSecondTask << " total:(" << totalMatchingPairsSecondTask << ")\n";

  }
  cout << "Total fitting first task: " << totalMatchingPairsFirstTask;
  cout << "\nTotal fitting second task: " << totalMatchingPairsSecondTask;

}