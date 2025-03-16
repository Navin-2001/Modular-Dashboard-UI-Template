import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Plus, Pencil } from "lucide-react";
import { mockStudents } from "@/lib/mock-data";
import { StudentFormDialog } from "@/components/student-form-dialog";

export function Students() {
  const [students, setStudents] = useState(mockStudents);

  const handleSaveStudent = (studentData) => {
    // Check if the student already exists (edit operation)
    const existingStudentIndex = students.findIndex(
      (s) => s.id === studentData.id
    );

    if (existingStudentIndex >= 0) {
      // Update existing student
      const updatedStudents = [...students];
      updatedStudents[existingStudentIndex] = studentData;
      setStudents(updatedStudents);
    } else {
      // Add new student
      setStudents([...students, studentData]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Students</h2>
          <p className="text-muted-foreground">
            Manage your student records here.
          </p>
        </div>
        <StudentFormDialog
          onSaveStudent={handleSaveStudent}
          triggerButton={
            <Button className="flex items-center">
              <Plus className="mr-2 h-4 w-4" />
              Add Student
            </Button>
          }
        />
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search students..."
            className="pl-9 max-w-md"
          />
        </div>
        <Button variant="outline" className="flex items-center">
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </div>

      <div className="rounded-lg border bg-white shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Grade</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Enrollment Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id} className="hover:bg-gray-50">
                <TableCell className="font-medium">{student.name}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>{student.grade}</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                      student.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {student.status}
                  </span>
                </TableCell>
                <TableCell>{student.enrollmentDate}</TableCell>
                <TableCell className="text-right">
                  <StudentFormDialog
                    student={student}
                    onSaveStudent={handleSaveStudent}
                    triggerButton={
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center"
                      >
                        <Pencil className="mr-1 h-3 w-3" /> Edit
                      </Button>
                    }
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
