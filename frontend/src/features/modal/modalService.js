const openModal = async () => {
  return new Promise((resolve) =>
    setTimeout(() => resolve({ val: true }), 500)
  );
};

const modalService = {
  openModal,
};

export default modalService;
