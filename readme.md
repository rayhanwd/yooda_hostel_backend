<!-- 1. Admin can add food with price.Form will have - food name, cost price,after adding show it in a
table (backend pagination mandatory) , He can edit and delete each item.
FoodItem(id, name, price)

2. Admin can add new student , Form will contain -
full name, roll,age, class, hall name , status (“active”, “inActive”, )
Student(id, fullName, roll, age, class, hall, status)

3. Student table will have a checkbox in every row, and the admin can change status ( “inActive”,
“active”) by selecting multiple items from the table.(Bulk action by single button click).

4. There will be a student table (backend pagination mandatory), edit and delete items. -->

5. While serving food, create a distribution form where admin can search students by roll, select
“shift” from drop down, “Date”. Add food item they want to take, Then change the status to
“served”
Distribution(id, studentId, date, shift,status, foodItemList)

6. If a student has been already serve in that shift on date, show a message - “Already served”

