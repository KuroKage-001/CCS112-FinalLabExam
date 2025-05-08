<?php

namespace App\Http\Controllers;

use App\Models\MedicalRecord;
use App\Models\Patient;
use Illuminate\Http\Request;

class MedicalRecordController extends Controller
{
    public function index(Patient $patient)
    {
        $medicalRecords = $patient->medicalRecords;
        return response()->json($medicalRecords);
    }

    public function store(Request $request, Patient $patient)
    {
        $request->validate([
            'visit_date' => 'required|date',
            'diagnosis' => 'required|string',
            'prescription' => 'required|string',
        ]);

        $medicalRecord = $patient->medicalRecords()->create($request->all());
        return response()->json($medicalRecord, 201);
    }

    public function show(MedicalRecord $medicalRecord)
    {
        return response()->json($medicalRecord);
    }

    public function update(Request $request, MedicalRecord $medicalRecord)
    {
        $request->validate([
            'visit_date' => 'required|date',
            'diagnosis' => 'required|string',
            'prescription' => 'required|string',
        ]);

        $medicalRecord->update($request->all());
        return response()->json($medicalRecord);
    }

    public function destroy(MedicalRecord $medicalRecord)
    {
        $medicalRecord->delete();
        return response()->json(null, 204);
    }
} 