"use client";
import React from "react";
import { db } from "../Utils/firebase";
import {
  useState,
  useEffect,
  createContext,
  useContext,
  FC,
  ReactNode,
} from "react";
import { useAuthentication } from "./auth";
import School from "../Services/School";
import Students from "../Services/Students";
import Class from "@/Services/Class";
import Subject from "@/Services/Subject";
import Expense from "@/Services/Expense";
import Guardian from "@/Services/Guardian";
import Staff from "@/Services/Staff";
import Teacher from "@/Services/Teacher";

export const SchoolContext = createContext<any>(undefined);

interface SchoolProviderProps {
  children: ReactNode;
}

export const SchoolProvider: FC<SchoolProviderProps> = ({ children }: any) => {
  const [students, setStudents] = useState<any[]>([]);
  const [school, setSchool] = useState<any | null>(null);
  const [teachers, setTeachers] = useState<any[]>([]);
  const [staff, setStaff] = useState<any[]>([]);
  const [classes, setClasses] = useState<any[]>([]);
  const [subjects, setSubjects] = useState<any[]>([]);
  const [expense, setExpense] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [guardians, setGuradians] = useState<any[]>([]);
  const [maleStudents, setMaleStudents] = useState<any[]>([]);
  const [femaleStudents, setFemaleStudents] = useState<any[]>([]);
  const { admin } = useAuthentication();

  useEffect(() => {
    if (admin) {
      School.getSchoolByAdminId(admin.adminUID)
        .then((response) => {
          if (response) {
            console.log(JSON.stringify(response))
            setSchool(response);
            try {
              const schoolUID = response?.school_id;
              getClasses(schoolUID)
              getSubjects(schoolUID)
              getExpense(schoolUID)
              getGuardians(schoolUID)
              getStaff(schoolUID)
              getTeachers(schoolUID)
              getStudents(schoolUID)
            } catch (error) {
              console.error("Error:", error);
            }
          }
        })
        .catch((error: any) => {
          console.log("error", error);
        });
    }
  }, [admin]);

  const registerClass = async (classData: any) => {
    try {
      const adminUID = school?.adminUID[0];
      const schoolUID = school.school_id;
      await Class.register({ adminUID, schoolUID, classData });
      await getClasses(schoolUID)
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
    }
  };

  const getClasses = async (schoolUID: any) => {
    try {
      const data = await Class.get(schoolUID);
      setClasses(data);
      setLoading(false);
    } catch (error: any) {
      setClasses([]);
      setLoading(false);
    }
  };

  const addSubject = async (subjectData: any) => {
    try {
      const adminUID = school?.adminUID[0];
      const schoolUID = school.school_id;
      await Subject.add({ adminUID, schoolUID, subjectData });
      await getSubjects(schoolUID)
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
    }
  };

  const getSubjects = async (schoolUID: any) => {
    try {
      const data = await Subject.get(schoolUID);
      setSubjects(data);
      setLoading(false);
    } catch (error: any) {
      setSubjects([]);
      setLoading(false);
    }
  };
  const addExpense = async (subjectData: any) => {
    try {
      const adminUID = school?.adminUID[0];
      const schoolUID = school.school_id;
      await Expense.add({ adminUID, schoolUID, subjectData });
      await getExpense(schoolUID)
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
    }
  };

  const getExpense = async (schoolUID: any) => {
    try {
      const data = await Expense.get(schoolUID);
      setExpense(data);
      setLoading(false);
    } catch (error: any) {
      setExpense([]);
      setLoading(false);
    }
  };


  const addStaff = async (staffData: any) => {
    try {
      const adminUID = school?.adminUID[0];
      const schoolUID = school.school_id;
      await Staff.add({ adminUID, schoolUID, staffData });
      await getStaff(schoolUID)
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
    }
  };

  const getStaff = async (schoolUID: any) => {
    try {
      const data = await Staff.get(schoolUID);
      setStaff(data);
      setLoading(false);
    } catch (error: any) {
      setStaff([]);
      setLoading(false);
    }
  };

  const rgisterGuardian = async (guardianData: any) => {
    try {
      const adminUID = school?.adminUID[0];
      const schoolUID = school.school_id;
      await Guardian.register({ adminUID, schoolUID, guardianData });
      await getGuardians(schoolUID)
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
    }
  };

  const getGuardians = async (schoolUID: any) => {
    try {
      const data = await Guardian.get(schoolUID);
      setGuradians(data);
      setLoading(false);
    } catch (error: any) {
      setGuradians([]);
      setLoading(false);
    }
  };
  
  const rgisterTeacher= async (teacherData: any) => {
    try {
      const adminUID = school?.adminUID[0];
      const schoolUID = school.school_id;
      await Teacher.register({ adminUID, schoolUID,teacherData });
      await getTeachers(schoolUID)
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
    }
  };

  const getTeachers = async (schoolUID: any) => {
    try {
      const data = await Teacher.get(schoolUID);
      setTeachers(data);
      setLoading(false);
    } catch (error: any) {
      setTeachers([]);
      setLoading(false);
    }
  };

  const rgisterStudent= async (studentData: any) => {
    try {
      const adminUID = school?.adminUID[0];
      const schoolUID = school.school_id;
      await Students.register({ adminUID, schoolUID,studentData });
      await getStudents(schoolUID)
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
    }
  };

  const getStudents = async (schoolUID: any) => {
    try {
      const data = await Students.get(schoolUID);
      setStudents(data);
      setLoading(false);
    } catch (error: any) {
      setTeachers([]);
      setLoading(false);
    }
  };

  return (
    <SchoolContext.Provider
      value={{
        students,
        school,
        guardians,
        teachers,
        staff,
        classes,
        subjects,
        expense,
        loading,
        maleStudents,
        femaleStudents,
        addStaff,
        getStaff,
        registerClass,
        getClasses,
        addSubject,
        getSubjects,
        addExpense,
        getExpense,
        rgisterGuardian,
        getGuardians,
        rgisterTeacher,
        getTeachers,
        rgisterStudent,
        getStudents
      }}
    >
      {children}
    </SchoolContext.Provider>
  );
};

export const useSchoolData = () => {
  const context = useContext(SchoolContext);
  if (!context) {
    throw new Error("useSchoolData must be used within a SchoolProvider");
  }
  return context;
};
