import "./formInput.scss"

export default function FormInput(props) {
  return (
    <div className="formInput">
      <input
        placeholder={props.placeholder}
        type={props.type}
        name={props.name}
        />
    </div>
  )
}
