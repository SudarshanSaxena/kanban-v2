# Kanban Board by Sudarshan Saxena

# `https://kanban.sudosuper.com`

# Yes, I deployed it on my own domain 💪🏻

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.


## Checklist covered
Use Dummy API: Fetch and update todos using DummyJSON Todos API. ❌

Instead of using a dummy api, I created my own database and APIs using Supabase ✅

I did this as to enhance my web portfolio 🚀

The current version is deployed on AWS cloudfront and is linked to my personal domain 


## Functional implementation
Fetch and display todos from the API. ✅

Create a new todo. ✅

Update a todo (edit title, description, etc.). ✅

Change the status of a todo (move between lanes). ✅

Delete a todo. ✅

## Additional Features
Create a new Board 🚀

Create new columns inside the board 🚀


## UI requirements - Objective (looks good to me 😜)
Use a Kanban-style board with vertical lanes for different statuses (e.g.,"Pending", "In Progress", "Completed"). ✅

Allow users to drag and drop todos between lanes to update their status. ✅

Simple but clean UI/UX (minimal styling required, but it should be visually
understandable). ✅


# Decisions
The overall architecture is very simple.

User can create Multiple boards and the boards can have multiple columns. 🚀

The architecture and the components are made using the same idea.

We have a BoardsView component at the beginning which holds a list of boards.

Once we click on a board we can see BoardComponent which holds all the columns linked to the board.

Every column contains a list of tasks. User can click on the tasks and read their description and edit/delete them.

# Future improvements

Using a proper backend for communication with the database, right now the app is utilizing the capabilities of SupaBase.

Using NgRx for state management

Implementation of auth

Implementation of role based access (Read, write)

Multiple feature which other CRM tools contains like assignment to team member, priority, addition of images etc.


