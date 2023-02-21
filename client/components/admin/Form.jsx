import React from "react";

const Form = ({
  handleSubmit,
  formData,
  setFormData,
  loading,
  type = "create",
}) => {
  const setFileToBase = (e, field) => {
    const file = e.target.files[0];
    const reader = (readFile) =>
      new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = () => resolve(fileReader.result);
        fileReader.readAsDataURL(readFile);
      });

    if (field === "image") {
      reader(file).then((result) =>
        setFormData({ ...formData, image: result })
      );
    } else if (field === "banner") {
      reader(file).then((result) =>
        setFormData({ ...formData, banner: result })
      );
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="name">Product Name</label>
          <input
            id="name"
            type="text"
            placeholder="Product Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="category">Category</label>
          <input
            id="category"
            type="text"
            placeholder="Product Name"
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="image">Image</label>
          <input
            onChange={(e) => setFileToBase(e, "image")}
            placeholder={loading ? "loading..." : "select Image"}
            hidden
            type="file"
            id="image"
            className="flex flex-col items-center justify-center p-5 border-[2px] h-[100px] border-dashed bg-[#fafafa] text-[#bdbdbd] outline-none transition-border duration-300 cursor-pointer focus:border-[#2196f3] hover: border-[#2196f3]"
          />
        </div>
        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="banner">Banner</label>
          <input
            onChange={(e) => setFileToBase(e, "banner")}
            placeholder={loading ? "loading..." : "select Image"}
            hidden
            type="file"
            id="banner"
            className="flex flex-col items-center justify-center p-5 border-[2px] h-[100px] border-dashed bg-[#fafafa] text-[#bdbdbd] outline-none transition-border duration-300 cursor-pointer focus:border-[#2196f3] hover: border-[#2196f3]"
          />
        </div>
        <div className="flex gap-5 justify-between flex-wrap">
          <div className="flex  w-[48%]  flex-col gap-2 mb-4">
            <label htmlFor="price">Price</label>
            <input
              id="price"
              type="number"
              placeholder="Price"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
            />
          </div>
          <div className="flex w-[48%] flex-col gap-2 mb-4">
            <label htmlFor="brand">Brand</label>
            <input
              id="brand"
              type="text"
              placeholder="Brand"
              value={formData.brand}
              onChange={(e) =>
                setFormData({ ...formData, brand: e.target.value })
              }
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="description">Description</label>
          <textarea
            className="resize-none"
            id="description"
            type="text"
            placeholder="Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        </div>
        <div className="flex gap-5 justify-between flex-wrap">
          <div className="flex  w-[48%]  flex-col gap-2 mb-4">
            <label htmlFor="stock">Number In Stock</label>
            <input
              id="stock"
              type="number"
              placeholder="Number In Stock"
              value={formData.countInStock}
              onChange={(e) =>
                setFormData({ ...formData, countInStock: e.target.value })
              }
            />
          </div>
          <div className="flex w-[48%] flex-col gap-2 mb-4">
            <label htmlFor="featured">Featured</label>
            <select
              id="featured"
              value={formData.isFeatured}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  isFeatured: e.target.value === "true" ? true : false,
                });
              }}
            >
              <option value={false}>No</option>
              <option value={true}>Yes</option>
            </select>
          </div>
        </div>
        <button
          type="submit"
          className="primary-button my-5 w-full font-bold transition"
          disabled={loading}
        >
          {type === "create"
            ? loading
              ? "Adding..."
              : "Add Product"
            : loading
            ? "Updating..."
            : "Update"}
        </button>
      </form>
    </>
  );
};

export default Form;
