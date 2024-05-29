package testes;

import java.util.Scanner;

public class Calculator {

    public int calculate(int a, int b, String operation) {
        switch (operation) {
            case "add":
                return a + b;
            case "subtract":
                return a - b;
            case "multiply":
                return a * b;
            case "divide":
                if (b == 0) {
                    System.out.println("Cannot divide by zero!");
                    return 0;
                } else {
                    return a / b;
                }
            default:
                System.out.println("Invalid operation!");
                return 0;
        }
    }    
    
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        Calculator calculator = new Calculator();

        while (true) {
            System.out.println("Enter first number:");
            int a = scanner.nextInt();
            System.out.println("Enter second number:");
            int b = scanner.nextInt();
            System.out.println("Enter operation (add, subtract, multiply, divide):");
            String operation = scanner.next();

            int result = calculator.calculate(a, b, operation);
            System.out.println("Result: " + result);

            System.out.println("Do you want to continue? (yes/no)");
            if (scanner.next().equals("no")) {
                break;
            }
        }
        scanner.close();
    }
}
