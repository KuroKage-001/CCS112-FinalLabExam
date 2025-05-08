<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Task;

class UpdateTasksSeeder extends Seeder
{
    public function run()
    {
        $tasks = [
            [
                "id" => 1,
                "title" => "Conduct Monthly Team Performance Review",
                "description" => "Schedule and conduct a performance review meeting with the sales team to discuss Q1 targets, achievements, and areas for improvement.",
                "status" => "in progress",
                "due_date" => "1994-06-25",
                "created_at" => "2025-03-20T13:50:15.000000Z",
                "updated_at" => "2025-03-20T23:14:29.000000Z"
            ],
            [
                "id" => 2,
                "title" => "Design Marketing Campaign for Product Launch",
                "description" => "Create a detailed marketing plan for the upcoming product launch, including social media ads, email campaigns, and a press release. Coordinate with the design team for visuals.",
                "status" => "pending",
                "due_date" => "1997-10-01",
                "created_at" => "2025-03-20T13:50:15.000000Z",
                "updated_at" => "2025-03-20T13:50:15.000000Z"
            ],
            [
                "id" => 3,
                "title" => "Fix Bugs in User Authentication Module",
                "description" => "Investigate and resolve reported bugs in the user authentication module of the web app, including issues with password reset and two-factor authentication.",
                "status" => "in progress",
                "due_date" => "1998-02-20",
                "created_at" => "2025-03-20T13:50:15.000000Z",
                "updated_at" => "2025-03-20T13:50:15.000000Z"
            ],
            [
                "id" => 4,
                "title" => "Prepare Financial Report for Q2",
                "description" => "Compile financial data for the second quarter, including revenue, expenses, and profit margins. Present findings to the board for review.",
                "status" => "in progress",
                "due_date" => "2018-12-24",
                "created_at" => "2025-03-20T13:50:15.000000Z",
                "updated_at" => "2025-03-20T13:50:15.000000Z"
            ],
            [
                "id" => 5,
                "title" => "Complete Onboarding for New Employees",
                "description" => "Finalize the onboarding process for the new hires in the HR department, including setting up their accounts, providing training materials, and scheduling orientation.",
                "status" => "completed",
                "due_date" => "2014-08-19",
                "created_at" => "2025-03-20T13:50:15.000000Z",
                "updated_at" => "2025-03-20T13:50:15.000000Z"
            ],
            [
                "id" => 6,
                "title" => "Schedule Client Meeting for Project Kickoff",
                "description" => "Arrange a kickoff meeting with the client to discuss project goals, timelines, and deliverables for the website redesign project.",
                "status" => "pending",
                "due_date" => "1973-06-27",
                "created_at" => "2025-03-20T13:50:15.000000Z",
                "updated_at" => "2025-03-20T13:50:15.000000Z"
            ],
            [
                "id" => 7,
                "title" => "Update Inventory for Online Store",
                "description" => "Review and update the inventory list for the online store, ensuring all product quantities are accurate and new items are added to the catalog.",
                "status" => "pending",
                "due_date" => "2008-01-18",
                "created_at" => "2025-03-20T13:50:15.000000Z",
                "updated_at" => "2025-03-20T13:50:15.000000Z"
            ],
            [
                "id" => 8,
                "title" => "Develop Training Module for Customer Support Team",
                "description" => "Create a training module for the customer support team, covering best practices for handling customer inquiries, resolving complaints, and using the CRM system.",
                "status" => "completed",
                "due_date" => "2023-02-11",
                "created_at" => "2025-03-20T13:50:15.000000Z",
                "updated_at" => "2025-03-20T13:50:15.000000Z"
            ],
            [
                "id" => 9,
                "title" => "Optimize Database Performance for Mobile App",
                "description" => "Analyze and optimize the database queries used by the mobile app to improve performance, focusing on reducing load times for user data retrieval.",
                "status" => "in progress",
                "due_date" => "2009-12-12",
                "created_at" => "2025-03-20T13:50:15.000000Z",
                "updated_at" => "2025-03-20T13:50:15.000000Z"
            ],
            [
                "id" => 10,
                "title" => "Plan Team Building Event for Next Quarter",
                "description" => "Organize a team-building event for the next quarter, including selecting a venue, planning activities, and sending invitations to all employees.",
                "status" => "completed",
                "due_date" => "2011-02-22",
                "created_at" => "2025-03-20T13:50:15.000000Z",
                "updated_at" => "2025-03-20T13:50:15.000000Z"
            ],
            [
                "id" => 11,
                "title" => "Research New CRM Software Options",
                "description" => null,
                "status" => "pending",
                "due_date" => null,
                "created_at" => "2025-03-20T22:59:09.000000Z",
                "updated_at" => "2025-03-20T22:59:09.000000Z"
            ],
            [
                "id" => 12,
                "title" => "Draft Proposal for Website Redesign",
                "description" => "Prepare a detailed proposal for the client, outlining the scope, timeline, and cost for the website redesign project.",
                "status" => "pending",
                "due_date" => "2023-12-01",
                "created_at" => "2025-03-20T23:10:35.000000Z",
                "updated_at" => "2025-03-20T23:10:35.000000Z"
            ]
        ];

        foreach ($tasks as $taskData) {
            Task::updateOrCreate(
                ['id' => $taskData['id']], // Match by 'id'
                $taskData                  // Insert or update with this data
            );
        }
    }
}