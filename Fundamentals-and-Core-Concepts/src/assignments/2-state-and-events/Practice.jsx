import React from 'react'

export const Practice = () => {

    const sayHello = (name) => {
        alert(name);
    }

function submitHandler(){
    e.preventDefault();
    console.log("Form Submited");
}

    return (
        <>
            <div className='flex flex-col gap-10'>
                <button onClick={() => sayHello("Hello")} className='border[1px] border-black w-fit bg-amber-500'>Click me</button>

                <input
                    onChange={(e) => console.log(e.target.value)}
                    type="text" placeholder='Enter Your THought' className='w-fit p-5 ' />


                <form action='' onSubmit={submitHandler}>
                    <button>Submit</button>
                </form>

            </div>

        </>
    )
}
