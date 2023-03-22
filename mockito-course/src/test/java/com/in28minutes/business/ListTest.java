package com.in28minutes.business;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.*;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.util.List;

import javax.management.RuntimeErrorException;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.junit.MockitoJUnitRunner;


//@RunWith(MockitoJUnitRunner.class)
public class ListTest {

	@Test
	public void letsMockListSizeMethod() {

		List listMock = mock(List.class);
		
		when(listMock.size()).thenReturn(2).thenReturn(3);
		
		assertEquals(2, listMock.size());
		assertEquals(3, listMock.size());
	}
	
	@Test
	public void letsMockListGetMethod() {
		
		List listMock = mock(List.class);
		
		// Argument Matcher
		when(listMock.get(anyInt())).thenReturn("in28Minutes");
		
		assertEquals("in28Minutes", listMock.get(0));
		assertEquals("in28Minutes", listMock.get(1));
	}

	
	@Test
	public void letsMockListGet_usingBDD() {
		
		// Given
		
		
		List<String> listMock = mock(List.class);
		
		// Argument Matcher
		given(listMock.get(anyInt())).willReturn("in28Minutes");
		
		
		//When 
		
		String firstElement = listMock.get(0);
		
		// Then
		assertThat(firstElement,  is("in28Minutes"));
		assertEquals("in28Minutes", listMock.get(0));
		assertEquals("in28Minutes", listMock.get(1));
	}
	
	@Test(expected = RuntimeException.class)
	public void letsMockList_throwAnException() {
		
		List listMock = mock(List.class);
		
		// Argument Matcher
		when(listMock.get(anyInt())).thenThrow(new RuntimeException("something"));
		
		listMock.get(0);
//		assertEquals("in28Minutes", listMock.get(0));
//		assertEquals("in28Minutes", listMock.get(1));
	}

	
	@Test(expected = RuntimeException.class)
	public void letsMockList_mixingup() {
		
		List listMock = mock(List.class);
		
		// Argument Matcher
		when(listMock.subList(anyInt(),5)).thenThrow(new RuntimeException("something"));
		
		listMock.get(0);
//		assertEquals("in28Minutes", listMock.get(0));
//		assertEquals("in28Minutes", listMock.get(1));
	}

}
