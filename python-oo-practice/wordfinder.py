"""Word Finder: finds random words from a dictionary."""
import random


class WordFinder:
    """
        reads words from file into list
        provides method to retrieve random word from list

        >>> wf = WordFinder("simple.txt")
        3 words read

        >>> wf.random() in ["Albert","donkey","mansion"]
        True

    """
    
    def __init__(self, file_path):
        """
            opens a file
            reads file content
            closes the file
            then prints the content count
        """
        reader = open(file_path)
        self.words_list = self.read_file(reader)
        reader.close()
        print(f"{len(self.words_list)} words read")    
        
    def random(self):
        """returns a random value from the words_list"""
        return self.words_list[random.randrange(len(self.words_list))]

    def read_file(self,reader):
        """reads a file and returns a list of content"""
        return [line.strip() for line in reader]

class SpecialWordFinder(WordFinder):
    """
        reads words from formatted file
        excludes empty lines and lines starting with #

        >>> wf = WordFinder("simple.txt")
        3 words read

        >>> wf.random() in ["Albert","donkey","mansion"]
        True
    """
    def read_file(self, reader):
        """reads a formatted file and returns a list of valid words"""
        return [line.strip() for line in reader if line.strip() and not line.startswith("#")]

wf = SpecialWordFinder("complex.txt")

for i in range(15):
    print(wf.random() in ["Albert","donkey","mansion"])