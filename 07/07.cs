List<string> allLinesText = File.ReadAllLines("C://input.txt").ToList();

directoryNode currentNode = null;
directoryNode headNode = null;
Dictionary<string, int> allFolderSums = new();

foreach (string line in allLinesText)
{
  parseLineToTree(line);
}

calculateTotalFolderSizes(headNode);

Console.WriteLine("Part one:" + allFolderSums.Values.Where(sum => sum < 100000).Sum());
Console.WriteLine("Part two:" + partTwo(allFolderSums));

void parseLineToTree(string line)
{
  if (line.StartsWith("$ cd .."))
  {
    currentNode = currentNode.parentNode;
    return;
  }
  if (line.StartsWith("$ cd"))
  {
    string directoryName = line.Substring(5);

    if (currentNode is null)
    {
      currentNode = new() { directoryName = directoryName, childNodes = new() };
      headNode = currentNode;
    }
    else
    {
      currentNode = currentNode.childNodes.Where(
     (childNode) => (childNode.directoryName == directoryName)).First();
    }
  }

  if (line.StartsWith("dir"))
  {
    string directoryName = line.Substring(4);
    currentNode.childNodes.Add(new() { directoryName = directoryName, childNodes = new(), parentNode = currentNode });
  }

  if (Char.IsDigit(line[0]))
  {
    int firstSpaceIndex = line.IndexOf(' ');
    int size = int.Parse(line.Substring(0, firstSpaceIndex));

    currentNode.fileSumSize += size;
  }
}

void calculateTotalFolderSizes(directoryNode directoryNode)
{
  directoryNode.childNodes.ForEach(node => { calculateTotalFolderSizes(node); });
  directoryNode.fileAndFolderSumSize = directoryNode.fileSumSize + directoryNode.childNodes.Sum(node => node.fileAndFolderSumSize);

  //stupid idea to keep the sizes in a dictionary, didn't realise folders can be named the same
  allFolderSums.Add(directoryNode.directoryName + "(" + directoryNode.fileAndFolderSumSize + ")", directoryNode.fileAndFolderSumSize);
}

int partTwo(Dictionary<string, int> allFolderSums)
{
  int delta = 30000000 - (70000000 - (allFolderSums.Last().Value));
  var firstSmallest = allFolderSums.Values.Where(value => value > delta).First();
  return firstSmallest;
}

public class directoryNode
{
  public string directoryName { get; set; }
  public directoryNode parentNode { get; set; }
  public List<directoryNode> childNodes { get; set; }
  public int fileSumSize { get; set; } = 0;
  public int fileAndFolderSumSize { get; set; } = 0;
}
