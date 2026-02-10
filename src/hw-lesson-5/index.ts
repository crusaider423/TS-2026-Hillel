/* Створіть класи Circle, Rectangle, Square і Triangle. 
У кожного з них є загальнодоступний метод calculateArea. 
У кожної фігури є загальнодоступні властивості - колір і назва, які не можна змінювати після створення. 
У Square і Rectangle зі свого боку є ще додатковий метод print, який виводить рядок із формулою розрахунку площі */

import { log } from "node:console";

 abstract class Shape {
  readonly color: string;
  readonly name: string;

  constructor(color: string, name: string) {
    this.color = color;
    this.name = name;
  }
  abstract calculateArea(...args: number[]): number;
}

class Circle extends Shape {
  override calculateArea(radius: number): number {
    return Math.PI * radius ** 2;
  }
}

class Rectangle extends Shape {
  override calculateArea(height: number, width: number): number {
    return height * width;
  }
  print(): void {
    console.log("Area = height * width");
  }
}
class Square extends Shape {
  override calculateArea(size: number): number {
    return size * size;
  }
  print(): void {
    console.log("Area = size * size");
  }
}

class Triangle extends Shape {
  override calculateArea(base: number, height: number): number {
    return (base * height) / 2;
  }
}


