use std::collections::HashSet;
use std::fs::File;
use std::hash::Hash;
use std::io::prelude::*;

fn main() {
    let mut file = File::open("C://input.txt").expect("File not found");
    let mut message_input = String::new();
    file.read_to_string(&mut message_input)
        .expect("Error while reading file");
    //println!("{}", data);

    //A:
    //let sub: String = data.chars().into_iter().take(4).collect();

    //B:
    let start_substring: String = message_input.chars().into_iter().take(14).collect();

    let mut char_vec: Vec<char> = start_substring.chars().collect();

    //let mut next_character_index: usize = 4;
    let mut next_character_index: usize = 14;

    while true {
        let has_unique_elements = has_unique_elements(char_vec.clone());
        //println!("curr chars: {:?} - {:?}", char_vec, has_unique_elements);
        if (has_unique_elements == true) {
            println!("Unique found after: {:?}", next_character_index);
            break;
        }
        char_vec.push(message_input.chars().nth(next_character_index).unwrap());
        char_vec.remove(0);
        next_character_index += 1;
    }
}

fn has_unique_elements<T>(iter: T) -> bool
where
    T: IntoIterator,
    T::Item: Eq + Hash,
{
    let mut uniq = HashSet::new();
    iter.into_iter().all(move |x| uniq.insert(x))
}
