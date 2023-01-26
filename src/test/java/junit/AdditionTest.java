package junit;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

import de.adesso.Addition;

class AdditionTest {

	Addition addition = new Addition();
	@Test
	void testAddition() {
		
		// given
		int numberOne = 10;
		
		int numberTwo = 30;
		
		// when
		
		int result = addition.addMethod(numberOne, numberTwo);
		
		// then
		
		assertEquals(40, result);
		
		
	}

}
