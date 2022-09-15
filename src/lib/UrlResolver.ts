class UrlResolver {
  index() {
    return "/";
  }

  getCloudinaryImg() {
    return "https://res.cloudinary.com/mockx/image/upload";
  }
}

export const urlResolver = new UrlResolver();
