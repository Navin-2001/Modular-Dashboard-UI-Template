import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Pencil, User, Mail, Calendar, Activity } from "lucide-react";
import { Card } from "@/components/ui/card";

export function StudentFormDialog({
  student = null,
  onSaveStudent,
  triggerButton,
}) {
  const [open, setOpen] = useState(false);
  const isEditMode = !!student;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    grade: "",
    status: "active",
    enrollmentDate: new Date().toISOString().split("T")[0],
  });

  // When student prop changes or component mounts with a student, update form data
  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name || "",
        email: student.email || "",
        grade: student.grade || "",
        status: student.status || "active",
        enrollmentDate:
          student.enrollmentDate || new Date().toISOString().split("T")[0],
      });
    }
  }, [student]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const studentData = isEditMode
      ? { ...student, ...formData } // For update, maintain the original ID
      : { ...formData, id: Math.random().toString(36).substring(2, 9) }; // For new, generate ID

    // Pass the data to parent component
    onSaveStudent(studentData);

    // Reset form and close dialog if not in edit mode
    if (!isEditMode) {
      setFormData({
        name: "",
        email: "",
        grade: "",
        status: "active",
        enrollmentDate: new Date().toISOString().split("T")[0],
      });
    }
    setOpen(false);
  };

  const resetForm = () => {
    if (isEditMode && student) {
      setFormData({
        name: student.name || "",
        email: student.email || "",
        grade: student.grade || "",
        status: student.status || "active",
        enrollmentDate:
          student.enrollmentDate || new Date().toISOString().split("T")[0],
      });
    } else {
      setFormData({
        name: "",
        email: "",
        grade: "",
        status: "active",
        enrollmentDate: new Date().toISOString().split("T")[0],
      });
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(newOpen) => {
        setOpen(newOpen);
        if (newOpen) resetForm();
      }}
    >
      <DialogTrigger asChild>
        {triggerButton || (
          <Button className="flex items-center bg-blue-600 hover:bg-blue-700 text-white shadow-md transition-all duration-200">
            {isEditMode ? (
              <Pencil className="mr-2 h-4 w-4" />
            ) : (
              <Plus className="mr-2 h-4 w-4" />
            )}
            {isEditMode ? "Edit Student" : "Add Student"}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl bg-white rounded-lg shadow-xl border-0">
        <form onSubmit={handleSubmit}>
          <DialogHeader className="pb-4 border-b">
            <DialogTitle className="text-2xl font-bold text-gray-800">
              {isEditMode ? "Edit Student" : "Add New Student"}
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              {isEditMode
                ? "Update the student details below."
                : "Enter the student details below to create a new student record."}
            </DialogDescription>
          </DialogHeader>

          <div className="py-6 space-y-5">
            <Card className="p-4 bg-gray-50 border-gray-100">
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <User className="h-6 w-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <Label
                    htmlFor="name"
                    className="text-sm font-medium text-gray-700 mb-1 block"
                  >
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Enter student's full name"
                    required
                  />
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-gray-50 border-gray-100">
              <div className="flex items-center gap-4">
                <div className="bg-purple-100 p-3 rounded-full">
                  <Mail className="h-6 w-6 text-purple-600" />
                </div>
                <div className="flex-1">
                  <Label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-700 mb-1 block"
                  >
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="student@example.com"
                    required
                  />
                </div>
              </div>
            </Card>

            <div className="grid md:grid-cols-2 gap-4">
              <Card className="p-4 bg-gray-50 border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <Activity className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <Label
                      htmlFor="grade"
                      className="text-sm font-medium text-gray-700 mb-1 block"
                    >
                      Grade Level
                    </Label>
                    <Select
                      value={formData.grade}
                      onValueChange={(value) =>
                        handleSelectChange("grade", value)
                      }
                    >
                      <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                        <SelectValue placeholder="Select grade" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="9">9th Grade</SelectItem>
                        <SelectItem value="10">10th Grade</SelectItem>
                        <SelectItem value="11">11th Grade</SelectItem>
                        <SelectItem value="12">12th Grade</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </Card>

              <Card className="p-4 bg-gray-50 border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="bg-amber-100 p-3 rounded-full">
                    <Calendar className="h-6 w-6 text-amber-600" />
                  </div>
                  <div className="flex-1">
                    <Label
                      htmlFor="enrollmentDate"
                      className="text-sm font-medium text-gray-700 mb-1 block"
                    >
                      Enrollment Date
                    </Label>
                    <Input
                      id="enrollmentDate"
                      name="enrollmentDate"
                      type="date"
                      value={formData.enrollmentDate}
                      onChange={handleChange}
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
              </Card>
            </div>

            <Card className="p-4 bg-gray-50 border-gray-100">
              <Label
                htmlFor="status"
                className="text-sm font-medium text-gray-700 mb-1 block"
              >
                Status
              </Label>
              <div className="grid grid-cols-2 gap-3">
                <div
                  className={`p-3 rounded-lg border-2 flex items-center justify-center cursor-pointer transition-all ${
                    formData.status === "active"
                      ? "border-green-600 bg-green-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => handleSelectChange("status", "active")}
                >
                  <div
                    className={`h-4 w-4 rounded-full mr-2 ${
                      formData.status === "active"
                        ? "bg-green-600"
                        : "bg-gray-200"
                    }`}
                  ></div>
                  <span
                    className={`font-medium ${
                      formData.status === "active"
                        ? "text-green-600"
                        : "text-gray-600"
                    }`}
                  >
                    Active
                  </span>
                </div>
                <div
                  className={`p-3 rounded-lg border-2 flex items-center justify-center cursor-pointer transition-all ${
                    formData.status === "inactive"
                      ? "border-gray-600 bg-gray-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => handleSelectChange("status", "inactive")}
                >
                  <div
                    className={`h-4 w-4 rounded-full mr-2 ${
                      formData.status === "inactive"
                        ? "bg-gray-600"
                        : "bg-gray-200"
                    }`}
                  ></div>
                  <span
                    className={`font-medium ${
                      formData.status === "inactive"
                        ? "text-gray-600"
                        : "text-gray-600"
                    }`}
                  >
                    Inactive
                  </span>
                </div>
              </div>
            </Card>
          </div>

          <DialogFooter className="pt-4 border-t flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className={`${
                isEditMode
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-green-600 hover:bg-green-700"
              } text-white shadow-md transition-all duration-200`}
            >
              {isEditMode ? "Update Student" : "Add Student"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
