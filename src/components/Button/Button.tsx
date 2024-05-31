

export default function Button({ doSomething, title, color }: {
    doSomething: any, title: string, color: string
}) {
    return (
        <button
            className={`
            duration-700
            hover:scale-110
            mt-3 font-bold
            font-mono text-2xl
            ${color} 
            py-[2rem] rounded-full bg-opacity-20`}
            onClick={doSomething} type="button">{title}
        </button>
    )
}
