"""Python serial number generator."""

class SerialGenerator:
    """Machine to create unique incrementing serial numbers.
    
    >>> serial = SerialGenerator(start=100)

    >>> serial.generate()
    100

    >>> serial.generate()
    101

    >>> serial.generate()
    102

    >>> serial.reset()

    >>> serial.generate()
    100
    """

    def __init__(self, start=0):
        "initializes serial generator"
        self.start = start
        self.increment = 0
    
    def __repr__(self):
        return f"<SerialGenerator: First Serial #={self.start} Next Serial #={self.start + self.increment}>"

    def reset(self):
        "resets serial generation incrementor"
        self.increment = 0
    
    def generate(self):
        "generates new serial number"
        self.serial_num = self.start + self.increment
        self.increment += 1
        return self.serial_num