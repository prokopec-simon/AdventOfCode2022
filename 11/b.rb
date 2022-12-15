class Monkey 
  attr_accessor :number, :items, :operation, :operationArgument, :divisibleCheck, :trueMonkeyTarget, :falseMonkeyTarget, :handleCount

  def initialize(number,items, divisibleCheck, operation, operationArgument, trueMonkeyTarget,falseMonkeyTarget)
   @number= number
   @items     = items
   @operation = operation
   @operationArgument = operationArgument
   @divisibleCheck   = divisibleCheck
   @trueMonkeyTarget = trueMonkeyTarget
   @falseMonkeyTarget = falseMonkeyTarget
   @handleCount = 0
 end

 def calculateNew(item)
  @newItemValue = 0;
  @secondArgument = 0;

  if operationArgument=="old"
    @secondArgument=item
  else
    @secondArgument=operationArgument.to_i
  end

  if(operation=="+")
    @newItemValue=item+@secondArgument;
  end

  if(operation=="*")
    @newItemValue=item*@secondArgument;
  end
  return @newItemValue;
 end

  def goThroughItems(allMonkeys, lcm)
    items.delete_if do |item|
      @newItem = calculateNew(item)
      @newItem = @newItem % lcm
      if @newItem%divisibleCheck==0
        allMonkeys[trueMonkeyTarget].items << @newItem
      else
        allMonkeys[falseMonkeyTarget].items << @newItem
      end
      @handleCount = @handleCount+1
      true 
    end
  end
end

allMonkeys = Array.new

text = File.read("C://input.txt")
myArray = text.split("\n");

myArray.each_with_index do |item, index|
  if index%7==0
    monkeyNumber = item[7]
    startingItems = myArray[index+1][18..-1].split(", ").map(&:to_i)
    operation = myArray[index+2][23]
    operationArgument =  myArray[index+2][25..-1]
    divisiBleCheck = (myArray[index+3][21..-1]).to_i
    trueMonkeyTarget =  (myArray[index+4][29..-1]).to_i
    falseMonkeyTarget = (myArray[index+5][30..-1]).to_i
    allMonkeys.push(Monkey.new(monkeyNumber, startingItems,divisiBleCheck,operation, operationArgument,  trueMonkeyTarget, falseMonkeyTarget))
  end
end

divisors = allMonkeys.map{|monkey| monkey.divisibleCheck}
lcm = divisors.reduce(1, :lcm)

for a in 1..10000 do 
  allMonkeys.each do | monkey |
    monkey.goThroughItems(allMonkeys, lcm)
  end
end

finalScore = 1;
puts (allMonkeys.sort_by{|e| -e.handleCount}.first(2)).map{|monkey| finalScore=finalScore*monkey.handleCount}