package com.in28minutes.business;

import static org.junit.Assert.assertEquals;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.then;
import static org.mockito.Mockito.atLeast;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Arrays;
import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import com.in28minutes.data.api.TodoService;

@RunWith(MockitoJUnitRunner.class)
public class TodoBusinessImplMockTest {
	
	@Mock
	TodoService todoServiceMock;
	
	@InjectMocks
	TodoBusinessImpl todoBusinessImpl;
	
	@Captor
	ArgumentCaptor<String> stringArgumentCaptor;
	
	

	@Test
	public void testRtrieveTodosNotRelatedToSpring_usingBDD() {
		
		
		// Given
		List<String> todos = Arrays.asList("Learn Spring MVC", "Learn Spring",
				"Learn to Dance");
		
		// return todos when the retrieveTodos called
		given(todoServiceMock.retrieveTodos("Dummy")).willReturn(todos);
		
		// When
		todoBusinessImpl.deleteTodosNotRelatedToSpring("Dummy");
		
		// then	
		verify(todoServiceMock).deleteTodo("Learn to Dance");
		verify(todoServiceMock, times(1)).deleteTodo("Learn to Dance");
		verify(todoServiceMock, atLeast(1)).deleteTodo("Learn to Dance");
		// verify if this method never called because it's related to spring 
		verify(todoServiceMock, never()).deleteTodo("Learn Spring MVC");
		
	}
	
	
	@Test
	public void testRtrieveTodosRelatedToSpring_withEmptyList() {
		
		
//		TodoService todoServiceStub = new TodoServiceStub();
		
		//TodoService todoServiceMock =  Mockito.mock();
//		stub(todoServiceMock.retrieveTodos("parameter")).return("value");
		
		List<String> todos = Arrays.asList();
		when(todoServiceMock.retrieveTodos("Dummy")).thenReturn(todos);
		
		
//		TodoBusinessImpl todoBusinessImpl = spy(new TodoBusinessImpl(todoServiceMock));
		TodoBusinessImpl todoBusinessImpl = new TodoBusinessImpl(todoServiceMock);
		List<String> filteredTodos=  todoBusinessImpl.retrieveTodosRelatedToSpring("Dummy");
		assertEquals(0, filteredTodos.size());
		
//		verify(todoServiceMock, times(1)).retrieveTodos(eq("Dummy"));
//		verify(todoServiceMock, never()).retrieveTodos("Test123");
	}
	
	
	@Test
	public void testRtrieveTodosRelatedToSpring_usingAMock() {
		
		
//		TodoService todoServiceStub = new TodoServiceStub();
		
		//TodoService todoServiceMock =  Mockito.mock();
//		stub(todoServiceMock.retrieveTodos("parameter")).return("value");
		
		
		//Given
		List<String> todos = Arrays.asList("Learn Spring MVC", "Learn Spring",
				"Learn to Dance");
		
		given(todoServiceMock.retrieveTodos("Dummy")).willReturn(todos);
		
		TodoBusinessImpl todoBusinessImpl = new TodoBusinessImpl(todoServiceMock);
		
		
		//When
		// return todos when the retrieveTodos called
//		when(todoServiceMock.retrieveTodos("Dummy")).thenReturn(todos);
		todoBusinessImpl.deleteTodosNotRelatedToSpring("Dummy");
		
        //Then
		then(todoServiceMock).should().deleteTodo("Learn to Dance");

		then(todoServiceMock).should(never()).deleteTodo("Learn Spring");
		
		then(todoServiceMock).should(never()).deleteTodo("Learn Spring");
		
		
		
		
//		TodoBusinessImpl todoBusinessImpl = spy(new TodoBusinessImpl(todoServiceMock));
//		List<String> filteredTodos=  todoBusinessImpl.retrieveTodosRelatedToSpring("Dummy");
//		assertEquals(2, filteredTodos.size());
		
//		verify(todoServiceMock, times(1)).retrieveTodos(eq("Dummy"));
//		verify(todoServiceMock, never()).retrieveTodos("Test123");
	}
	
	


}
