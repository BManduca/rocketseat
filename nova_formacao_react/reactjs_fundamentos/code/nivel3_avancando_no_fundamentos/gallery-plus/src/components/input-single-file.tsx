import React from "react"
import { useWatch } from "react-hook-form"
import { tv, type VariantProps } from "tailwind-variants"
import FileImageIcon from "../assets/icons/image.svg?react"
import UploadFileIcon from "../assets/icons/upload-file.svg?react"
import Icon from "./icon"
import Text, { textVariants } from "./text"

export const inputSingleFileVariants = tv({
  base: `
    flex flex-col items-center justify-center w-full
    border border-solid border-border-primary
    group-hover:border-border-active
    rounded-lg gap-1 transition
  `,
  variants: {
    size: {
      md: "px-5 py-6",
    },
  },
  defaultVariants: {
    size: "md",
  },
})

export const inputSingleFileIconVariants = tv({
  base: "fill-placeholder",
  variants: {
    size: {
      md: "h-8 w-8",
    },
  },
  defaultVariants: {
    size: "md",
  },
})

interface InputSingleFileProps
  extends VariantProps<typeof inputSingleFileVariants>,
    Omit<React.ComponentProps<"input">, "size"> {
  // biome-ignore lint/suspicious/noExplicitAny: because is a dinamic form
  form: any
  allowedExtensions: string[]
  maxSizeFileInMB: number
  error?: React.ReactNode
}

export function InputSingleFile({
  size,
  error,
  form,
  allowedExtensions,
  maxSizeFileInMB,
  ...props
}: InputSingleFileProps) {
  const formValues = useWatch({ control: form.control })
  const name = props.name || ""
  const formFile: File = React.useMemo(
    () => formValues[name]?.[0],
    [formValues, name]
  )

  const { fileExtension, fileSize } = React.useMemo(
    () => ({
      fileExtension: formFile?.name?.split(".")?.pop()?.toLowerCase() || "",
      fileSize: formFile?.size || 0,
    }),
    [formFile]
  )

  function isValidExtension() {
    return allowedExtensions.includes(fileExtension)
  }

  function isValidSize() {
    // o file do arquivo é recebido em bytes
    // por isso a conversão
    return fileSize <= maxSizeFileInMB * 1024 * 1024
  }

  function isValidFile() {
    return isValidExtension() && isValidSize()
  }

  return (
    <div>
      {/** biome-ignore lint/complexity/useSimplifiedLogicExpression: not necessary */}
      {!formFile || !isValidFile() ? (
        <>
          <div className="group relative w-full cursor-pointer">
            <input
              className={
                "absolute top-0 right-0 h-full w-full cursor-pointer opacity-0"
              }
              type="file"
              {...props}
            />
            <div className={inputSingleFileVariants({ size })}>
              <Icon
                className={inputSingleFileIconVariants({ size })}
                svg={UploadFileIcon}
              />
              <Text
                className="text-center text-placeholder"
                variant="label-medium"
              >
                Arraste o arquivo aqui
                <br />
                ou clique para selecionar
              </Text>
            </div>
          </div>
          <div className="mt-1 flex flex-col gap-1">
            {formFile && !isValidExtension() && (
              <Text className="text-accent-red" variant="label-small">
                Tipo de arquivo inválido!
              </Text>
            )}
            {formFile && !isValidSize() && (
              <Text className="text-accent-red" variant="label-small">
                O tamanho do arquivo ultrapassa o limite permitido!
              </Text>
            )}
            {error && (
              <Text className="text-accent-red" variant="label-small">
                {error}
              </Text>
            )}
          </div>
        </>
      ) : (
        <div className="mt-5 flex items-center gap-3 rounded border border-border-primary border-solid p-3">
          <Icon className="h-6 w-6 fill-white" svg={FileImageIcon} />
          <div className="flex flex-col">
            <div className="max-w-80 truncate">
              <Text className="text-placeholder" variant="label-medium">
                {formFile.name}
              </Text>
            </div>
            <div className="flex">
              <button
                className={textVariants({
                  variant: "label-small",
                  className: "cursor-pointer text-accent-red hover:underline",
                })}
                onClick={() => {
                  form.setValue(name, undefined)
                }}
                type="button"
              >
                Remover
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
