"use client";
import React, { useState } from "react";

const TestPage = ({ params: { lang = "en" } }) => {
  const [formData, setFormData] = useState({
    articleNumber: "",
    title: "",
    description: "",
    image: null,
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "articleNumber") {
      if (value === "" || /^[0-9]*$/.test(value)) {
        setFormData((prev) => ({ ...prev, [name]: value }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.articleNumber) {
      newErrors.articleNumber =
        lang === "en" ? "Article number is required" : "رقم المقال مطلوب";
    } else if (isNaN(formData.articleNumber)) {
      newErrors.articleNumber =
        lang === "en"
          ? "Article number must be a number"
          : "يجب أن يكون رقم المقال رقماً";
    }

    if (!formData.title.trim()) {
      newErrors.title = lang === "en" ? "Title is required" : "العنوان مطلوب";
    }

    if (!formData.image) {
      newErrors.image = lang === "en" ? "Image is required" : "الصورة مطلوبة";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitSuccess(false);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("articleNumber", formData.articleNumber);
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("image", formData.image);

      const response = await fetch("/api/articles", {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create article");
      }

      const newArticle = await response.json();
      setSubmitSuccess(true);
      setFormData({
        articleNumber: "",
        title: "",
        description: "",
        image: null,
      });
      setPreviewImage(null);
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="articles-box">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="articleNumber" className="form-label">
            {lang === "en" ? "Article Number" : "رقم المقال"}
          </label>
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            className={`form-control ${
              errors.articleNumber ? "is-invalid" : ""
            }`}
            id="articleNumber"
            name="articleNumber"
            value={formData.articleNumber}
            onChange={handleChange}
            placeholder={
              lang === "en" ? "Enter article number" : "أدخل رقم المقال"
            }
          />
          {errors.articleNumber && (
            <div className="invalid-feedback">{errors.articleNumber}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            {lang === "en" ? "Title" : "العنوان"}
          </label>
          <input
            type="text"
            className={`form-control ${errors.title ? "is-invalid" : ""}`}
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder={lang === "en" ? "Enter title" : "أدخل العنوان"}
          />
          {errors.title && (
            <div className="invalid-feedback">{errors.title}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            {lang === "en" ? "Description" : "الوصف"}
          </label>
          <textarea
            className={`form-control ${errors.description ? "is-invalid" : ""}`}
            id="description"
            name="description"
            rows="3"
            value={formData.description}
            onChange={handleChange}
            placeholder={lang === "en" ? "Enter description" : "أدخل الوصف"}
          ></textarea>
          {errors.description && (
            <div className="invalid-feedback">{errors.description}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            {lang === "en" ? "Image" : "الصورة"}
          </label>
          <input
            type="file"
            className={`form-control ${errors.image ? "is-invalid" : ""}`}
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
          />
          {errors.image && (
            <div className="invalid-feedback">{errors.image}</div>
          )}
          {previewImage && (
            <div className="mt-2">
              <img
                src={previewImage}
                alt="Preview"
                className="img-thumbnail"
                style={{ maxHeight: "200px" }}
              />
            </div>
          )}
        </div>

        <button type="submit" className="submit-btn" disabled={isSubmitting}>
          {isSubmitting
            ? lang === "en"
              ? "Submitting..."
              : "جاري الإرسال..."
            : lang === "en"
            ? "Submit"
            : "إرسال"}
        </button>

        {submitSuccess && (
          <div className="alert alert-success mt-3">
            {lang === "en"
              ? "Article created successfully!"
              : "تم إنشاء المقال بنجاح!"}
          </div>
        )}

        {errors.submit && (
          <div className="alert alert-danger mt-3">{errors.submit}</div>
        )}
      </form>
    </div>
  );
};

export default TestPage;
