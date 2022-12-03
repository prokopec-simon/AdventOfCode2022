package main

import (
	"fmt"
	"io/ioutil"
	"strings"
)

func main() {
	content, err := ioutil.ReadFile("C:/input.txt")
	if err != nil {
		fmt.Printf("Error reading the file.")
		return
	}

	lines := strings.Split(string(content), "\r\n")

	var allLetters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
	var allValueSum int

	for index, currentRow := range lines {
		if index%3 == 0 {
			for _, currentLetter := range currentRow {
				if strings.Contains(lines[index+1], string(currentLetter)) && strings.Contains(lines[index+2], string(currentLetter)) {
					allValueSum += strings.Index(allLetters, string(currentLetter)) + 1
					break
				}
			}
		}
	}
	fmt.Printf("%#v\n", allValueSum)
}
