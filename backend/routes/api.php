<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\TestController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\TasksController;
use App\Http\Controllers\Api\ProjectsController;
use App\Http\Controllers\Api\TaskSubmissionsController;
use App\Http\Controllers\Api\RolesPermissionsController;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');



Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);

Route::group(['middleware'=>['auth:sanctum', 'permission']], function(){
   Route::get('/permissions', [RolesPermissionsController::class, 'index'])->name('permissions.index');
   Route::resource('projects', ProjectsController::class);
   Route::resource('comments', TaskSubmissionsController::class);
   Route::get('/users', [UserController::class, 'index'])->name('users.index');
   Route::post('/users', [UserController::class, 'store'])->name('users.store');
   Route::put('/users/{id}', [UserController::class, 'update'])->name('users.update');
   Route::delete('/users/{id}', [UserController::class, 'delete'])->name('users.delete');
   // Route::get('/tasks/{projectId}', [TasksController::class, 'showProjectsTasks'])->name('tasks.showProjectsTasks');
   Route::get('/logout', [UserController::class, 'logout'])->name('user.logout');
   Route::get('/tasks-search', [TasksController::class, 'search'])->name('tasks.search');
   Route::delete('/tasks-archive/{id}', [TasksController::class, 'archive'])->name('tasks.archive');
   Route::get('/tasks-archive', [TasksController::class, 'getArchive'])->name('tasks.getArchive');
   Route::resource('tasks', TasksController::class);
   Route::get('/tasks-search', [TasksController::class, 'search'])->name('tasks.search');  
   Route::get('/projects_search', [ProjectsController::class, 'search'])->name('projects.search');  

});

Route::get('/files/{files}', [TaskSubmissionsController::class, 'showFiles'])->name("show.files");