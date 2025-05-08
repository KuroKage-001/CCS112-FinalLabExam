<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\MedicalRecordController;

Route::apiResource('tasks', TaskController::class);
Route::apiResource('patients', PatientController::class);

// Nested routes for medical records
Route::get('patients/{patient}/medical-records', [MedicalRecordController::class, 'index']);
Route::post('patients/{patient}/medical-records', [MedicalRecordController::class, 'store']);
Route::get('medical-records/{medicalRecord}', [MedicalRecordController::class, 'show']);
Route::put('medical-records/{medicalRecord}', [MedicalRecordController::class, 'update']);
Route::delete('medical-records/{medicalRecord}', [MedicalRecordController::class, 'destroy']);