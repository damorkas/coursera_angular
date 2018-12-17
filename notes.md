Traditional three layers:
- presentation layer(HTML/CSS/JS)
- business logic layer(Python, .NET)
- data access layer(SQL)

JS Full Stack:
- JS Framework/library
- NodeJS
- MongoDB

Git basics:
• git init
    - initializes the current folder as a git respository
• git status
    - current status of the folder
• git add <file(s)/folder(s)>
    - add file to the staging area (git add . -> adds all the files from current directory)
• git commit -m "message"
    - commit the changes to the git repository
• git log --oneline
    - logs commits
• git checkout <commit><file>
    - checkout the file from an older commit
• git reset
    - reset the stagging area to the last commit
• git remote add origin <url>
    - add remote inline repo
• git push -u origin master
    - push local git repo to the origin to the master branch
• git clone <url>
    - clone git repo to local machine

Angular Architecture:
    • Modular
    • Component-based with templated
    • Services

Decorator - function that modify JS class (eg. @NgModule)

Component.ts -> Metadata / properties / methods ; property binding / event binding
Template.html

Data Binding (Template -> DOM ; Component -> Property)

One-way from data source to view target bindings:
{{expression}} : {{dish.name}} ; Interpolation
[target]="expression" : [dish]="selectedDish" ; Property Attribute
bind-target="expression" : bind-dish="selectedDish"

One-way from view target to data source bindings:
(target)="statement" : (click)="onSelected(dish)" ; Event
on-target="statement" : on-click="onSelect(dish)"

Two-way
[(target)]="expression" : [(ngModel)]="dish.name"
bindon-target="expression"

[()] -> banana in a box

Binding targets -> left side of binding declaration: 
[..], (..), [(..)]
Target properties must be explicitly marked as Input or Output properties using decorators:
@Input dish: Dish;
@Output deleteDish = new EventEmitter<Dish>();


Design Pattern -> reusable solution to commonly occurring problems. (Gang of four)

MVC
MVVM


Angular Services:
- Dependency Injection
- Promises
- Reactive JavScript

