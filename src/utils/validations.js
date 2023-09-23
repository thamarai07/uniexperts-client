import * as Yup from "yup";

export const phoneRegExp =
	/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const passwordValidation = Yup.string()
	.required("Required")
	.matches(
		/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
		" "
	);

const emailValidation = Yup.string()
	.email("Please enter a valid email")
	.required("Required");

export const loginValidation = Yup.object({
	email: emailValidation,
	password: Yup.string().required("Required"),
});

export const signupValidation = Yup.object({
	password: passwordValidation,
	confirmPassword: Yup.string()
		.oneOf(
			[Yup.ref("password"), null],
			"The password did not match. Please check."
		)
		.required("Required"),
});

export const forgotValidation = Yup.object({
	email: emailValidation,
});

export const resetValidation = Yup.object({
	password: passwordValidation,
	confirmPassword: Yup.string()
		.oneOf([Yup.ref("password"), null], "Passwords must match")
		.required("Required"),
});

export const generalValidation = Yup.object({
	studentInformation: Yup.object({
		salutation: Yup.string().nullable().required("Salutation Required"),
		firstName: Yup.string().required("First Name is Required"),
		lastName: Yup.string().required("Last Name is Required"),
		staffId: Yup.string().nullable().required("Required"),
		counsellorId: Yup.string().nullable().required("Counsellor is Required"),
		source: Yup.string().nullable().required("Source is Required"),
		passportNumber: Yup.string().required("Passport Number is Required"),
		mobile: Yup.string().required("Contact Number is Required"),
		whatsappNumber: Yup.string().required("Whatsapp Number is Required"),
		countryOfInterest: Yup.array().min(1, "Country of Interest is Required"),
		intakePreferred: Yup.string().nullable().required("Intake preferred is Required"),
		preferredCountry: Yup.array().min(1, "Preferred Country is Required"),
		// email: emailValidation,
	}),

	demographicInformation: Yup.object({
		haveMedicalHistory: Yup.boolean().nullable().required("Please Select Yes or No"),
		medicalHistoryDetails: Yup.string().nullable(),
		maritalStatus: Yup.string().nullable().required("Select Marital Status"),
		country: Yup.string().nullable().required("Country is Required"),
		firstLanguage: Yup.string().required("First Language is Required"),
		dateOfBirth: Yup.string().required("Date of Birth is Required"),
		gender: Yup.string().nullable().required("Select Gender Required"),
	}),

	address: Yup.object({
		address: Yup.string().nullable().required("Address is Required"),
		city: Yup.string().required("City is Required"),
		state: Yup.string().required("State is Required"),
		zipCode: Yup.string().required("ZipCode is Required"),
		country: Yup.string().nullable().required("Country is Required"),
	}),

	emergencyContact: Yup.object({
		name: Yup.string().required("Name is Required"),
		relationship: Yup.string().nullable().required("Relationship is Required"),
		email: Yup.string()
			.email("Please enter a valid email")
			.notOneOf(
				[Yup.ref("studentInformation.email")],
				"Student Email and Emergency should not be same."
			)
			.required("Email is Required"),
		phoneNumber: Yup.string().required("Phone Number is Required"),
		address: Yup.string().required("Address is Required"),
		country: Yup.string().nullable().required("Country is Required"),
	}),

	backgroundInformation: Yup.object({
		isRefusedVisa: Yup.boolean().nullable().required("Select Yes or No "),
		visaRefusalInformation: Yup.string().nullable(),
		haveStudyPermit: Yup.string().nullable().required("Study Permit Required"),
		studyPermitDetails: Yup.boolean().nullable().required("Study Permit Details Required"),
	}),
});

export const educationValidation = Yup.object({
	degree: Yup.string().required("Required"),
	isDegreeAwarded: Yup.string().nullable().required("Required"),
	level: Yup.string().nullable().required("Required"),
	country: Yup.string().required("Required"),
	institutionName: Yup.string().required("Required"),
	affiliatedUniversity: Yup.string().required("Required"),
	attendedFrom: Yup.string().required("Required"),
	attendedTo: Yup.string().required("Required"),
	degreeAwardedOn: Yup.string().required("Required"),
	class: Yup.string().required("Required"),
	cgpa: Yup.string().required("Required"),
});

export const workValidation = Yup.object({
	employerName: Yup.string().required("Required"),
	designation: Yup.string().required("Required"),
	doj: Yup.string().required("Required"),
	dor: Yup.string().required("Required"),
	contactInfo: Yup.string().required("Required"),
	email: emailValidation,
	signingAuthority: Yup.object({
		name: Yup.string().required("Required"),
		phone: Yup.string().required("Required"),
		email: emailValidation,
	}),
});
