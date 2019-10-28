const ModalComponent = function() {
  const modal = $("#modal");
  const body = document.getElementById("modalBody");
  const hideDiv = document.getElementById("hide");
  function show() {
    hideDiv.classList.remove("d-none");
    modal.modal("show");
  }

  function hide() {
    hideDiv.classList.add("d-none");
    modal.modal("hide");
  }

  function setBody(html) {
    body.innerHTML = html;
  }

  function showLoadGameModal() {
    $("#loadModal").modal("show");
  }

  return {
    show,
    hide,
    setBody,
    showLoadGameModal
  };
};

export default ModalComponent;
